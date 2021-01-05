import EditForm from '../view/edit-form';
import TripEventsItem from '../view/trip-events-item';
import {render, replace} from '../util/render';
import {ActionType, UpdateType} from "../util/const";

class Point {
  constructor(pointsListContainer, toggleFormHandler, changePointsModelHandler) {
    this._pointsListContainer = pointsListContainer;
    this._point = null;

    this._clickArrowHandler = this._clickArrowHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._clickFormArrowHandler = this._clickFormArrowHandler.bind(this);
    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);
    this._clickDeleteButton = this._clickDeleteButton.bind(this);

    this._toggleFormHandler = toggleFormHandler;
    this._changePointsModelHander = changePointsModelHandler;
  }

  _createComponents() {
    this._evtComponent = new TripEventsItem(this._point);
    this._editFormComponent = new EditForm(this._point);
  }

  _setHandlersToComponents() {
    this._evtComponent.setClickArrowHandler(this._clickArrowHandler);
    this._evtComponent.setClickFavoriteHandler(this._clickFavoriteHandler);
    this._editFormComponent.setSubmitHandler(this._submitHandler);
    this._editFormComponent.setClickArrowHandler(this._clickFormArrowHandler);
    this._editFormComponent.setDeleteButtonHandler(this._clickDeleteButton);
  }

  init(point) {
    this._point = point;

    this._createComponents();
    this._setHandlersToComponents();

    render(this._pointsListContainer, this._evtComponent, `beforeend`);
  }

  update(point) {
    this._point = point;

    const previousEvtComponent = this._evtComponent;

    this._createComponents();
    this._setHandlersToComponents();

    replace(this._evtComponent, previousEvtComponent);
  }

  _clickDeleteButton() {
    this._changePointsModelHander(this._point, ActionType.DELETE, UpdateType.MAJOR);
  }

  _clickFavoriteHandler() {
    const newPointData = Object.assign({}, this._point, {isFavorite: !this._point.isFavorite});
    this._changePointsModelHander(newPointData, ActionType.UPDATE, UpdateType.PATCH);
  }

  _clickArrowHandler() {
    this._pointToForm();
  }

  _getUpdateType(newPoint) {
    let result = UpdateType.PATCH;
    if (newPoint.destination !== this._point.destination
      || newPoint.startDate !== this._point.startDate
      || newPoint.endDate !== this._point.endDate
      || newPoint.price !== this._point.price) {
      result = UpdateType.MAJOR;
    }
    return result;
  }

  _submitHandler(point) {
    this.formToPoint();
    this._changePointsModelHander(point, ActionType.UPDATE, this._getUpdateType(point));
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

export {Point};
