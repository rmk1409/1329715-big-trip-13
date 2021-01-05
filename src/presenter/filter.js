import {render, RenderPosition} from "../util/render";
import {Filters as FilterView} from "../view/filters";
import Observer from "../util/pattern/observer/observer";

class Filter extends Observer {
  constructor(container, model, pointsModel) {
    super(pointsModel);

    this._container = container;
    this._model = model;
    this._filterView = null;

    this._changeFilterHandler = this._changeFilterHandler.bind(this);
  }

  init() {
    this._filterView = new FilterView(this._subject.state);
    render(this._container, this._filterView, RenderPosition.AFTER_END);
    this._filterView.getElement().addEventListener(`change`, this._changeFilterHandler);
  }

  _changeFilterHandler(evt) {
    this._model.activeFilter = evt.target.value;
    // this._pointsModel.tripPoints =
  }

  getActiveFilter() {
    return this._model.activeFilter;
  }

  update(updateType, updatedPoint) {

  }
}

export {Filter};
