export default class Subject {
  constructor(state) {
    this._state = state;
    this._observers = new Set();
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
  }

  addObserver(observer) {
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  notifyAllObservers() {
    this._observers.forEach((observer) => observer.update());
  }
}
