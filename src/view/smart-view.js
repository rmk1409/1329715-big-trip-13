import AbstractView from "./abstract-view";

export default class SmartView extends AbstractView {
  constructor(state) {
    super();
    this._state = Object.assign({}, state);
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  updateData(changedData, needReload = true) {
    this._state = Object.assign({}, this._state, changedData);
    if (needReload) {
      this.updateElement();
    }
  }

  restoreHandlers() {
    throw new Error(`Must be implemented.`);
  }
}
