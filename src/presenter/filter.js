import {render, RenderPosition} from "../utils/render";
import Filters from "../view/filters";

class Filter {
  constructor(container, model, pointsModel) {
    this._container = container;
    this._model = model;
    this._pointsModel = pointsModel;

    this._filterView = new Filters(this._pointsModel);
    this._changeFilterHandler = this._changeFilterHandler.bind(this);
  }

  init() {
    render(this._container, this._filterView, RenderPosition.AFTER_END);

    this._filterView.getElement().addEventListener(`change`, this._changeFilterHandler);
  }

  _changeFilterHandler(evt) {
    this._model.activeFilter = evt.target.value;
    this._pointsModel.tripPoints =
  }

  getActiveFilter() {
    return this._model.activeFilter;
  }
}

export {Filter};
