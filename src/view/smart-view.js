import AbstractView from "./abstract-view";
import {getAvailableOffers} from '../mock/offer';

export default class SmartView extends AbstractView {
  constructor(point) {
    super();
    this._point = Object.assign({}, point);
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
    this._point = Object.assign({}, this._point, changedData);
    if (needReload) {
      this.updateElement();
    }
    this._point.availableOffers = getAvailableOffers(this._point.type);
  }

  restoreHandlers() {
    throw new Error(`Must be implemented.`);
  }
}
