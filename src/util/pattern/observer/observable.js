export default class Observable {
  constructor() {
    this._callbacks = new Set();
  }

  addObserver(callback) {
    this._callbacks.add(callback);
  }

  removeObserver(callback) {
    this._callbacks.delete(callback);
  }

  notifyAllObservers(updateType, updateData) {
    this._callbacks.forEach((callback) => callback(updateType, updateData));
  }
}
