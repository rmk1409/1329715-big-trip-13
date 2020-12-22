import EditForm from '../view/edit-form';
import TripEventsItem from '../view/trip-events-item';
import {render, replace} from '../utils/render';

export default class Point {
  constructor(pointsListContainer, toggleFormHandler, updateBoardData) {
    this._pointsListContainer = pointsListContainer;
    this._point = null;

    this._clickArrowHandler = this._clickArrowHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._clickFormArrowHandler = this._clickFormArrowHandler.bind(this);
    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);

    this._toggleFormHandler = toggleFormHandler;
    this._updateBoardData = updateBoardData;
  }

  initOrUpdate(point) {
    if (this._point) {
      this._updateBoardData(point);
    }

    this._point = point;

    const previousEvtComponent = this._evtComponent;

    this._evtComponent = new TripEventsItem(point);
    this._editFormComponent = new EditForm(point);

    this._evtComponent.setClickArrowHandler(this._clickArrowHandler);
    this._evtComponent.setClickFavoriteHandler(this._clickFavoriteHandler);
    this._editFormComponent.setSubmitHandler(this._submitHandler);
    this._editFormComponent.setClickArrowHandler(this._clickFormArrowHandler);

    if (previousEvtComponent) {
      replace(this._evtComponent, previousEvtComponent);
    } else {
      render(this._pointsListContainer, this._evtComponent, `beforeend`);
    }
  }

  _clickFavoriteHandler() {
    const newPointData = Object.assign({}, this._point, {isFavorite: !this._point.isFavorite});
    this.initOrUpdate(newPointData);
  }

  _clickArrowHandler() {
    this._pointToForm();
  }

  _submitHandler(point) {
    this.formToPoint();
    this.initOrUpdate(point);
  }

  _clickFormArrowHandler() {
    this.reset();
    this.formToPoint();
  }

  _pointToForm() {
    this._toggleFormHandler(this);
    replace(this._editFormComponent, this._evtComponent);
  }

  formToPoint() {
    this._toggleFormHandler();
    replace(this._evtComponent, this._editFormComponent);
  }

  reset() {
    this._editFormComponent.updateData(this._point);
  }
}
