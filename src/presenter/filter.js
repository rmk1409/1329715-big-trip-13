import {remove, render, RenderPosition} from "../util/render";
import {Filters as FilterView} from "../view/filters";
import Observer from "../util/pattern/observer/observer";
import {UpdateType} from "../util/const";

class Filter extends Observer {
  constructor(container, model, pointsModel) {
    super(model);

    this._container = container;
    this._filterModel = model;
    this._pointsModel = pointsModel;
    this._filterView = null;

    this._changeFilterHandler = this._changeFilterHandler.bind(this);
    this._pointsModel.addObserver(this);
  }

  init() {
    this._filterView = new FilterView(this._pointsModel.state, this._filterModel.state);
    render(this._container, this._filterView, RenderPosition.AFTER_END);
    this._filterView.getElement().addEventListener(`change`, this._changeFilterHandler);
  }

  _changeFilterHandler(evt) {
    this._filterModel.state = evt.target.value;
  }

  update(updateType) {
    if (updateType === UpdateType.PATCH) {
      return;
    }

    remove(this._filterView);

    this._filterView = new FilterView(this._pointsModel.state, this._filterModel.state);
    render(this._container, this._filterView, RenderPosition.AFTER_END);
    this._filterView.getElement().addEventListener(`change`, this._changeFilterHandler);
  }
}

export {Filter};
