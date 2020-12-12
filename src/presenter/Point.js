import EditForm from '../view/edit-form';
import TripEventsItem from '../view/trip-events-item';
import {render, replace} from '../utils/render';

export default class Point {
  constructor(pointsListContainer) {
    this._pointsListContainer = pointsListContainer;
    this._pointData = null;

    this._clickArrowHandler = this._clickArrowHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._clickFormArrowHandler = this._clickFormArrowHandler.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);
  }

  initOrUpdate(point) {
    this._pointData = point;

    const previousEvtComponent = this._evtComponent;

    this._evtComponent = new TripEventsItem(point);
    this._editFormComponent = new EditForm(point);

    this._evtComponent.setClickArrowHandler(this._clickArrowHandler);
    this._evtComponent.setClickFavoriteHandrel(this._clickFavoriteHandler);
    this._editFormComponent.setSubmitHandler(this._submitHandler);
    this._editFormComponent.setClickArrowHandler(this._clickFormArrowHandler);

    if (previousEvtComponent) {
      replace(this._evtComponent, previousEvtComponent);
    } else {
      render(this._pointsListContainer, this._evtComponent, `beforeend`);
    }
  }

  _clickFavoriteHandler() {
    const newPointData = Object.assign({}, this._pointData, {isFavorite: !this._pointData.isFavorite});
    this.initOrUpdate(newPointData);
  }

  _clickArrowHandler() {
    this._pointToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _submitHandler() {
    this._formToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _clickFormArrowHandler() {
    this._formToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _pointToForm() {
    replace(this._editFormComponent, this._evtComponent);
  }

  _formToPoint() {
    replace(this._evtComponent, this._editFormComponent);
  }

  _onEscKeyDown(evt) {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      this._formToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
