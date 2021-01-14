import EditForm from "../view/edit-form";
import {ActionType, State, UpdateType} from "../util/const";
import dayjs from "dayjs";
import {render, RenderPosition} from "../util/render";

const MIN_POINT_DURATION_IN_MIN = 5;

export default class NewPoint {
  constructor(pointsListContainer, changePointsModelHandler, cancelClickHandler, offerModel, destinationModel) {
    this._pointsListContainer = pointsListContainer;
    this._changePointsModelHander = changePointsModelHandler;
    this._cancelClickHandler = cancelClickHandler;

    this._submitHandler = this._submitHandler.bind(this);
    this._offerModel = offerModel;
    this._destinationModel = destinationModel;
  }

  _getEmptyPoint() {
    const firstType = Array.from(this._offerModel.offers.keys())[0];
    return {
      info: {},
      type: firstType,
      offers: [],
      startDate: dayjs(),
      endDate: dayjs().add(MIN_POINT_DURATION_IN_MIN, `minute`),
    };
  }

  init() {
    this._editFormComponent = new EditForm(this._getEmptyPoint(), this._offerModel, this._destinationModel, true);
    this._setHandlers();

    render(this._pointsListContainer, this._editFormComponent, RenderPosition.AFTER_BEGIN);
  }

  _setHandlers() {
    this._editFormComponent.setSubmitHandler(this._submitHandler);
    this._editFormComponent.setDeleteButtonHandler(this._cancelClickHandler);
  }

  _submitHandler(point) {
    this._changePointsModelHander(point, ActionType.ADD, UpdateType.MAJOR);
  }

  closeForm() {
    this._editFormComponent.getElement().remove();
  }

  setViewState(state) {
    const unlock = () => {
      this._editFormComponent.updateData({
        isDeleting: false,
        isSaving: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._editFormComponent.updateData({
          isSaving: true,
        });
        break;
      case State.UNLOCK:
        this._editFormComponent.shake(unlock);
        break;
    }
  }
}
