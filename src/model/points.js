import Observable from "../util/pattern/observer/observable";
import {UpdateType} from "../util/const";

class Points extends Observable {
  constructor(points) {
    super();
    this._points = points;
  }

  get points() {
    return this._points;
  }

  addPoint(newPoint) {
    this._points.push(newPoint);

    super.notifyAllObservers(UpdateType.MAJOR);
  }

  updatePoint(updateType, updatedPoint) {
    const index = this._points.findIndex(({id}) => id === updatedPoint.id);
    this._points[index] = updatedPoint;

    super.notifyAllObservers(updateType, updatedPoint);
  }

  deletePoint(point) {
    const index = this._points.findIndex(({id}) => point.id === id);
    this._points.splice(index, 1);

    super.notifyAllObservers(UpdateType.MAJOR);
  }
}

export {Points};
