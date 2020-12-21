import AbstractView from "./abstract-view";
import {getAvailableOffers} from '../mock/offer';

export default class SmartView extends AbstractView {
  constructor(point) {
    super();
    this._state = Object.assign({}, point);
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  updateData(changedData) {
    this._state = Object.assign({}, this._state, changedData);
    this.updateElement();
    this._state.availableOffers = getAvailableOffers(this._state.type);
  }

  restoreHandlers() {
    throw new Error(`Must be implemented.`);
  }
}
