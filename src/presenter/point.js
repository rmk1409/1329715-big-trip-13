import EditForm from '../view/edit-form';
import TripEventsItem from '../view/trip-events-item';
import {render, RenderPosition, replace} from '../util/render';
import {ActionType, State, UpdateType} from "../util/const";
import {isOnline} from "../util/common";
import {toast} from "../util/toast/toast";

class Point {
  constructor(pointsListContainer, openedPointPresenterSetter, changePointsModelHandler, offerModel, destinationModel) {
    this._pointsListContainer = pointsListContainer;
    this._point = null;

    this._clickArrowHandler = this._clickArrowHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._clickFormCloseArrowHandler = this._clickFormCloseArrowHandler.bind(this);
    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);
    this._clickDeleteButton = this._clickDeleteButton.bind(this);

    this._openedPointPresenterSetter = openedPointPresenterSetter;
    this._changePointsModelHander = changePointsModelHandler;

    this._offerModel = offerModel;
    this._destinationModel = destinationModel;
    this._isFormOpened = false;
  }

  _createComponents() {
    this._evtComponent = new TripEventsItem(this._point);
    this._editFormComponent = new EditForm(this._point, this._offerModel, this._destinationModel);
  }

  _setHandlersToComponents() {
    this._evtComponent.setClickArrowHandler(this._clickArrowHandler);
    this._evtComponent.setClickFavoriteHandler(this._clickFavoriteHandler);
    this._editFormComponent.setSubmitHandler(this._submitHandler);
    this._editFormComponent.setClickArrowHandler(this._clickFormCloseArrowHandler);
    this._editFormComponent.setDeleteButtonHandler(this._clickDeleteButton);
  }

  init(point) {
    this._point = point;

    this._createComponents();
    this._setHandlersToComponents();

    render(this._pointsListContainer, this._evtComponent, RenderPosition.BEFORE_END);
  }

  update(point) {
    this._point = point;

    const previousEvtComponent = this._evtComponent;
    const previousFormComponent = this._editFormComponent;

    this._createComponents();
    this._setHandlersToComponents();

    if (this._isFormOpened) {
      replace(this._editFormComponent, previousFormComponent);
    } else {
      replace(this._evtComponent, previousEvtComponent);
    }
  }

  _clickDeleteButton() {
    if (isOnline()) {
      this._changePointsModelHander(this._point, ActionType.DELETE, UpdateType.MAJOR);
    } else {
      toast(`You can't delete point offline`);
    }
  }

  _clickFavoriteHandler() {
    const newPointData = Object.assign({}, this._point, {isFavorite: !this._point.isFavorite});
    this._changePointsModelHander(newPointData, ActionType.UPDATE, UpdateType.PATCH);
  }

  _clickArrowHandler() {
    if (isOnline()) {
      this._pointToForm();
    } else {
      toast(`You can't edit point offline`);
    }
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
    if (isOnline()) {
      this._changePointsModelHander(point, ActionType.UPDATE, this._getUpdateType(point));
    } else {
      toast(`You can't submit point data offline`);
    }
  }

  _clickFormCloseArrowHandler() {
    this.resetIntermediateState();
    this.toggleFormToPoint();
  }

  _pointToForm() {
    this._isFormOpened = true;
    this._openedPointPresenterSetter(this);
    replace(this._editFormComponent, this._evtComponent);
  }

  resetIntermediateState() {
    this._editFormComponent.updateData(this._point, true);
  }

  toggleFormToPoint() {
    this._isFormOpened = false;
    this._openedPointPresenterSetter(null);
    replace(this._evtComponent, this._editFormComponent);
  }

  setViewState(state) {
    const arrowButton = this._evtComponent.getElement().querySelector(`.event__rollup-btn`);
    const unlock = () => {
      const resetObject = {
        isDeleting: false,
        isSaving: false,
      };
      arrowButton.disabled = false;
      if (this._isFormOpened) {
        this._editFormComponent.updateData(resetObject);
      } else {
        this._evtComponent.updateData(resetObject);
      }
    };

    switch (state) {
      case State.SAVING:
        arrowButton.disabled = true;
        if (this._isFormOpened) {
          this._editFormComponent.updateData({isSaving: true});
        } else {
          this._evtComponent.updateData({isSaving: true}, false);
        }
        break;
      case State.DELETING:
        arrowButton.disabled = true;
        this._editFormComponent.updateData({isDeleting: true});
        break;
      case State.UNLOCK:
        if (this._isFormOpened) {
          this._editFormComponent.shake(unlock);
        } else {
          this._evtComponent.shake(unlock);
        }
        break;
    }
  }
}

export {Point};
