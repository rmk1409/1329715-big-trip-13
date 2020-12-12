import Menu from '../view/menu';
import Filters from '../view/filters';
import TripEventsList from '../view/trip-events-list';
import Sort from '../view/sort';
import TripInfo from '../view/trip-info';
import TripCost from '../view/trip-cost';
import {render, RenderPosition} from '../utils/render';
import ListEmpty from '../view/list-empty';
import Point from './Point';

const SortMode = {
  DEFAULT: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

export default class Trip {
  constructor(tripInfoContainer, pointsInfoContainer) {
    this._tripInfoContainer = tripInfoContainer;
    this._pointsInfoContainer = pointsInfoContainer;

    this._menuView = new Menu();
    this._filterView = new Filters();
    this._sortView = new Sort();
    this._pointListView = new TripEventsList();
    this._noPointsView = new ListEmpty();

    this._points = null;
    this._tripInfoView = null;
    this._tripCostView = null;

    this._pointPresenters = new Map();
    this._openedPointId = null;

    this._closeOpenFormCB = this._closeOpenFormCB.bind(this);
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._currentSortMode = SortMode.DEFAULT;
  }

  init(points) {
    this._points = points.slice();

    this._tripInfoView = new TripInfo(this._points);
    this._tripCostView = new TripCost(this._points);

    this._renderTrip();
  }

  _renderTrip() {
    this._renderMenu();
    this._renderFilters();
    this._renderSort();
    this._renderTripEventsList();

    this._renderTripInfo();
    this._renderTripCost();

    this._sortByDay();
    this._renderPoints();
  }

  _renderMenu() {
    const menuHeader = this._tripInfoContainer.querySelector(`.trip-controls h2:first-child`);
    render(menuHeader, this._menuView, RenderPosition.AFTER_END);
  }

  _renderFilters() {
    const filterHeader = this._tripInfoContainer.querySelector(`.trip-controls h2:nth-of-type(2)`);
    render(filterHeader, this._filterView, RenderPosition.AFTER_END);
  }

  _renderSort() {
    this._sortView.setSortChangeHandler(this._sortChangeHandler);
    const tripSortHeader = this._pointsInfoContainer.querySelector(`h2:first-child`);
    render(tripSortHeader, this._sortView, RenderPosition.AFTER_END);
  }

  _sortByDay() {
    this._points.sort((a, b) => a.startDate.isBefore(b.startDate) ? -1 : 1);
  }

  _sortByTime() {
    this._points.sort((a, b) => a.endDate.diff(a.startDate) - b.endDate.diff(b.startDate));
  }

  _sortByPrice() {
    this._points.sort((a, b) => a.price - b.price);
  }

  _sortChangeHandler(data) {
    if (this._isAnotherMode(data)) {
      this._currentSortMode = data;

      switch (data) {
        case SortMode.DEFAULT:
          this._sortByDay();
          break;
        case SortMode.TIME:
          this._sortByTime();
          break;
        case SortMode.PRICE:
          this._sortByPrice();
          break;
      }

      this._renderPoints();
    }
  }

  _isAnotherMode(data) {
    return data !== this._currentSortMode;
  }

  _renderTripEventsList() {
    render(this._pointsInfoContainer, this._pointListView, RenderPosition.BEFORE_END);
  }

  _clearPointsList() {
    this._pointsInfoContainer.querySelector(`.trip-events__list`).innerHTML = ``;
    this._pointPresenters.clear();
  }

  _renderPoints() {
    this._clearPointsList();
    if (this._points.length) {
      const pointsListContainer = this._pointsInfoContainer.querySelector(`.trip-events__list`);
      this._points.forEach((point) => this._renderPoint(point, pointsListContainer));
    } else {
      this._renderNoPoints();
    }
  }

  _renderPoint(point, pointsListContainer) {
    const presenter = new Point(pointsListContainer, this._closeOpenFormCB);
    presenter.initOrUpdate(point);
    this._pointPresenters.set(point.id, presenter);
  }

  _renderNoPoints() {
    render(this._pointsInfoContainer, this._noPointsView, RenderPosition.BEFORE_END);
  }

  _renderTripInfo() {
    render(this._tripInfoContainer, this._tripInfoView, RenderPosition.AFTER_BEGIN);
  }

  _renderTripCost() {
    const tripInfo = this._tripInfoContainer.querySelector(`.trip-info`);
    render(tripInfo, this._tripCostView, RenderPosition.BEFORE_END);
  }

  _closeOpenFormCB(openedPointId) {
    if (this._openedPointId) {
      this._pointPresenters.get(this._openedPointId)
        .formToPoint();
    }
    this._openedPointId = openedPointId;
  }
}
