import Menu from '../view/menu';
import Filters from '../view/filters';
import TripEventsList from '../view/trip-events-list';
import Sort from '../view/sort';
import TripInfo from '../view/trip-info';
import TripCost from '../view/trip-cost';
import {render, RenderPosition} from '../utils/render';
import ListEmpty from '../view/list-empty';
import Point from './Point';

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

    if (this._points.length) {
      this._renderPoints();
    } else {
      this._renderNoPoints();
    }
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
    const tripSortHeader = this._pointsInfoContainer.querySelector(`h2:first-child`);
    render(tripSortHeader, this._sortView, RenderPosition.AFTER_END);
  }

  _renderTripEventsList() {
    render(this._pointsInfoContainer, this._pointListView, RenderPosition.BEFORE_END);
  }

  _renderPoints() {
    const pointsListContainer = this._pointsInfoContainer.querySelector(`.trip-events__list`);
    this._points.forEach((point) => this._renderPoint(point, pointsListContainer));
  }

  _renderPoint(point, pointsListContainer) {
    const presenter = new Point(pointsListContainer);
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
}
