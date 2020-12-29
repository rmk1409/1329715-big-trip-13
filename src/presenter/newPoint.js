import EditForm from "../view/edit-form";
import {ActionType, UpdateType} from "../util/const";
import {TYPES} from "../mock/point";
import dayjs from "dayjs";
import {render, replace} from "../utils/render";


const EMPTY_POINT = {
  info: {},
  type: TYPES[0],
  offers: [],
  startDate: dayjs(),
  endDate: dayjs().add(5, `minute`),
};

export default class NewPoint {
  constructor(pointsListContainer, changePointsModelHandler) {
    this._pointsListContainer = pointsListContainer;
    this._changePointsModelHander = changePointsModelHandler;
    this.init();

    this._submitHandler = this._submitHandler.bind(this);
  }

  init() {
    this._editFormComponent = new EditForm(EMPTY_POINT, true);
    this._setHandlers();

    render(this._pointsListContainer, this._editFormComponent, `afterbegin`);
  }

  _setHandlers() {
    this._editFormComponent.setSubmitHandler(this._submitHandler);
    this._editFormComponent.setDeleteButtonHandler(this._clickCancelButton);
  }

  _submitHandler(point) {
    this.closeForm();
    this._changePointsModelHander(point, ActionType.ADD, UpdateType.MAJOR);
  }

  _clickCancelButton() {
    this.closeForm();
  }

  closeForm() {
    this._editFormComponent.getElement().remove();
  }
}
