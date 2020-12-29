import Subject from "../util/pattern/observer/subject";
import {UpdateType} from "../util/const";

class Points extends Subject {
  constructor(tripPoints) {
    super(tripPoints);
  }

  updatePoint(updatedPoint, updateType) {
    const index = this._state.findIndex(({id}) => id === updatedPoint.id);
    this._state[index] = updatedPoint;

    this.notifyAllObservers(updatedPoint, updateType);
  }

  addPoint(newTripPoint) {
    this._state.push(newTripPoint);

    this.notifyAllObservers(newTripPoint, UpdateType.MAJOR);
  }

  deletePoint(tripPoint) {
    const index = this._state.findIndex(({id}) => tripPoint.id === id);
    this._state.splice(index, 1);

    this.notifyAllObservers(tripPoint, UpdateType.MAJOR);
  }

  notifyAllObservers(updatedPoint, updateType) {
    this._observers.forEach((observer) => observer.update(updatedPoint, updateType));
  }
}

export {Points};
