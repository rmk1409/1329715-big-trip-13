import Observable from "../util/pattern/observer/observable";
import {UpdateType} from "../util/const";
import * as dayjs from "dayjs";

class Points extends Observable {
  constructor() {
    super();
    this._points = [];
  }

  get points() {
    return this._points;
  }

  set points(points) {
    this._points = points;

    this.notifyAllObservers(UpdateType.INIT);
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
    const {
      is_favorite: isFavorite,
      base_price: price,
      startDate = dayjs(point.date_from),
      endDate = dayjs(point.date_to),
      info = {description: point.destination.description, pictures: point.destination.pictures},
    } = point;
    const destination = point.destination.name;
    const adaptedPoint = Object.assign({}, point, {isFavorite, startDate, endDate, price, destination, info});

    delete adaptedPoint.is_favorite;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;

    return adaptedPoint;
  }

  // static adaptToServer(point) {
  //   const adaptedPoint = null;
  //
  //   return adaptedPoint;
  // }
}

export {Points};
