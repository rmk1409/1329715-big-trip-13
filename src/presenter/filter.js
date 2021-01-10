import {remove, render, RenderPosition} from "../util/render";
import {Filters as FilterView} from "../view/filters";
import {UpdateType} from "../util/const";

class Filter {
  constructor(container, pointsModel, filterModel) {
    this._container = container;
    this._filterView = null;

    this._changeFilterHandler = this._changeFilterHandler.bind(this);

    this.update = this.update.bind(this);

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._pointsModel.addObserver(this.update);
    this._filterModel.addObserver(this.update);
  }

  init() {
    this._filterView = new FilterView(this._pointsModel.points, this._filterModel.activeFilter);
    render(this._container, this._filterView, RenderPosition.AFTER_END);
    this._filterView.getElement().addEventListener(`change`, this._changeFilterHandler);
  }

  _changeFilterHandler(evt) {
    this._filterModel.activeFilter = evt.target.value;
  }

  update(updateType) {
    if (updateType === UpdateType.PATCH) {
      return;
    }

    remove(this._filterView);

    this._filterView = new FilterView(this._pointsModel.points, this._filterModel.activeFilter);
    render(this._container, this._filterView, RenderPosition.AFTER_END);
    this._filterView.getElement().addEventListener(`change`, this._changeFilterHandler);
  }
}

export {Filter};
