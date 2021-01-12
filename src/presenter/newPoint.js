import EditForm from "../view/edit-form";
import {ActionType, UpdateType} from "../util/const";
import {TYPES} from "../mock/point";
import dayjs from "dayjs";
import {render, RenderPosition} from "../util/render";

const MIN_POINT_DURATION_IN_MIN = 5;

const EMPTY_POINT = {
  info: {},
  type: TYPES[0],
  offers: [],
  startDate: dayjs(),
  endDate: dayjs().add(MIN_POINT_DURATION_IN_MIN, `minute`),
};

export default class NewPoint {
  constructor(pointsListContainer, changePointsModelHandler, cancelClickHandler, offerModel) {
    this._pointsListContainer = pointsListContainer;
    this._changePointsModelHander = changePointsModelHandler;
    this._cancelClickHandler = cancelClickHandler;

    this._submitHandler = this._submitHandler.bind(this);
    this._offerModel = offerModel;
  }

  init() {
    this._editFormComponent = new EditForm(EMPTY_POINT, this._offerModel, true);
    this._setHandlers();

    render(this._pointsListContainer, this._editFormComponent, RenderPosition.AFTER_BEGIN);
  }

  _setHandlers() {
    this._editFormComponent.setSubmitHandler(this._submitHandler);
    this._editFormComponent.setDeleteButtonHandler(this._cancelClickHandler);
  }

  _submitHandler(point) {
    this.closeForm();
    this._changePointsModelHander(point, ActionType.ADD, UpdateType.MAJOR);
  }

  closeForm() {
    this._editFormComponent.getElement().remove();
  }
}
