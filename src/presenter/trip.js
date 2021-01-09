import Menu from '../view/menu';
import TripEventsList from '../view/trip-events-list';
import Sort from '../view/sort';
import TripInfo from '../view/trip-info';
import TripCost from '../view/trip-cost';
import {remove, render, RenderPosition} from '../util/render';
import ListEmpty from '../view/list-empty';
import {Point as PointPresenter} from './point';
import {ActionType, UpdateType} from "../util/const";
import NewPoint from "./newPoint";
import {FilterFunction, FilterType} from "../model/filter";

const SortMode = {
  DEFAULT: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const sortMap = new Map();
sortMap.set(SortMode.DEFAULT, (a, b) => a.startDate.isBefore(b.startDate) ? -1 : 1);
sortMap.set(SortMode.TIME, (a, b) => a.endDate.diff(a.startDate) - b.endDate.diff(b.startDate));
sortMap.set(SortMode.PRICE, (a, b) => a.price - b.price);

class Trip {
  constructor(tripInfoContainer, pointsInfoContainer, pointsModel, filterModel) {
    this._tripInfoContainer = tripInfoContainer;
    this._pointsInfoContainer = pointsInfoContainer;

    this._menuView = new Menu();
    this._sortView = null;
    this._pointListView = new TripEventsList();
    this._noPointsView = new ListEmpty();

    this._tripInfoView = null;
    this._tripCostView = null;

    this._openedPointPresenter = null;

    this._openedPointPresenterSetter = this._openedPointPresenterSetter.bind(this);
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._changePointsModelHandler = this._changePointsModelHandler.bind(this);
    this._closeForm = this._closeForm.bind(this);
    this._currentSortMode = SortMode.DEFAULT;
    this._pointPresenters = new Map();

    this.openNewPointForm = this.openNewPointForm.bind(this);

    this._isOpenedNewPointPresenter = false;

    this.update = this.update.bind(this);

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._pointsModel.addObserver(this.update);
    this._filterModel.addObserver(this.update);
  }

  init() {
    this._renderTripEventsList();
    this._pointsListContainer = this._pointsInfoContainer.querySelector(`.trip-events__list`);

    this.newPoint = new NewPoint(this._pointsListContainer, this._changePointsModelHandler, this._closeForm);

    this._renderMenu();
    this._renderTripInfoAndCost();

    this._renderBoard();
  }

  openNewPointForm() {
    if (this._currentSortMode !== SortMode.DEFAULT) {
      this._sortChangeHandler(SortMode.DEFAULT);
    }
    this._filterModel.activeFilter = FilterType.EVERYTHING;

    if (this._openedPointPresenter) {
      this._openedPointPresenter.toggleFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._openedPointPresenter = null;
    }

    if (!this._isOpenedNewPointPresenter) {
      this.newPoint.init();
      this._isOpenedNewPointPresenter = true;
      document.addEventListener(`keydown`, this._onEscKeyDown);

      const newPointButton = this._tripInfoContainer.querySelector(`.trip-main__event-add-btn`);
      newPointButton.disabled = true;
    }
  }

  _renderMenu() {
    const menuHeader = this._tripInfoContainer.querySelector(`.trip-controls h2:first-child`);
    render(menuHeader, this._menuView, RenderPosition.AFTER_END);
  }

  _renderSort() {
    if (this._sortView) {
      remove(this._sortView);
      this._sortView = null;
    }
    this._sortView = new Sort(this._currentSortMode);
    this._sortView.setSortChangeHandler(this._sortChangeHandler);
    const tripSortHeader = this._pointsInfoContainer.querySelector(`h2:first-child`);
    render(tripSortHeader, this._sortView, RenderPosition.AFTER_END);
  }

  _getPoints() {
    const points = this._pointsModel.points.slice();
    const filterType = this._filterModel.activeFilter;
    const filteredPoints = FilterFunction.get(filterType)(points);
    filteredPoints.sort(sortMap.get(this._currentSortMode));
    return filteredPoints;
  }

  _sortChangeHandler(sortType) {
    if (Object.values(SortMode).indexOf(sortType) !== -1 && this._isAnotherMode(sortType)) {
      this._currentSortMode = sortType;
      this._clearPointsBoard();
      this._renderBoard();
    }
  }

  _isAnotherMode(newSortMode) {
    return newSortMode !== this._currentSortMode;
  }

  update(updateType, updatedPoint) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenters.get(updatedPoint.id).update(updatedPoint);
        break;
      case UpdateType.MINOR:
        this._clearPointsBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearPointsBoard(true);
        this._renderBoard();
        this._renderTripInfoAndCost();
        break;
    }
  }

  _renderBoard() {
    this._renderPoints(this._getPoints());
    this._renderSort();

  }

  _changePointsModelHandler(updatedPoint, actionType, updateType) {
    switch (actionType) {
      case ActionType.ADD:
        this._pointsModel.addPoint(updatedPoint, updateType);
        break;
      case ActionType.UPDATE:
        this._pointsModel.updatePoint(updatedPoint, updateType);
        break;
      case ActionType.DELETE:
        this._pointsModel.deletePoint(updatedPoint, updateType);
        break;
    }
  }

  _renderTripEventsList() {
    render(this._pointsInfoContainer, this._pointListView, RenderPosition.BEFORE_END);
  }

  _clearPointsBoard(resetSort) {
    this._pointsInfoContainer.querySelector(`.trip-events__list`).innerHTML = ``;
    this._openedPointPresenter = null;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointPresenters.clear();
    document.querySelectorAll(`.flatpickr-calendar`).forEach((e) => e.remove());

    if (resetSort) {
      this._currentSortMode = SortMode.DEFAULT;
    }

    remove(this._noPointsView);
  }

  _renderPoints(points) {
    if (points.length) {
      points.forEach((point) => this._renderPoint(point));
    } else {
      this._renderNoPoints();
    }
  }

  _renderPoint(point) {
    const presenter = new PointPresenter(this._pointsListContainer, this._openedPointPresenterSetter, this._changePointsModelHandler);
    presenter.init(point);
    this._pointPresenters.set(point.id, presenter);
  }

  _renderNoPoints() {
    render(this._pointsInfoContainer, this._noPointsView, RenderPosition.BEFORE_END);
  }

  _renderTripInfoAndCost() {
    const previousTripInfo = this._tripInfoContainer.querySelector(`.trip-main__trip-info`);
    if (previousTripInfo) {
      previousTripInfo.remove();
    }
    this._renderTripInfo();
    this._renderTripCost();
  }

  _renderTripInfo() {
    this._tripInfoView = new TripInfo(this._getPoints());
    render(this._tripInfoContainer, this._tripInfoView, RenderPosition.AFTER_BEGIN);
  }

  _renderTripCost() {
    this._tripCostView = new TripCost(this._getPoints());

    const tripInfo = this._tripInfoContainer.querySelector(`.trip-info`);
    render(tripInfo, this._tripCostView, RenderPosition.BEFORE_END);
  }

  _openedPointPresenterSetter(newOpenedPresenter) {
    if (newOpenedPresenter) {
      this._closeForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }
    this._openedPointPresenter = newOpenedPresenter;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      this._closeForm();
    }
  }

  _closeForm() {
    if (this._isOpenedNewPointPresenter) {
      this.newPoint.closeForm();
      this._isOpenedNewPointPresenter = false;
      this._tripInfoContainer.querySelector(`.trip-main__event-add-btn`).disabled = false;
    } else if (this._openedPointPresenter) {
      this._openedPointPresenter.resetIntermediateState();
      this._openedPointPresenter.toggleFormToPoint();
      this._openedPointPresenter = null;
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

export {Trip, SortMode};
