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

  static adaptToClient(point) {
    // check - destination {name, description, pictures[{src, description}]}
    // check - offers [{title, price}]
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        isFavorite: point.is_favorite,
        startDate: new Date(point.date_from),
        endDate: new Date(point.date_to),
        price: point.base_price,

      }
    );

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = null;

    return adaptedPoint;
  }
}

export {Points};
