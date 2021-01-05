export default class Observer {
  constructor(subject) {
    this._subject = subject;
    this._subject.addObserver(this);
  }

  update() {
    throw new Error(`Method isn't implemented.`);
  }
}
