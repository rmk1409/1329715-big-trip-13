import {createElement} from "../utils/render";

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't create Abstract instance.`);
    }

    this._element = null;
    this._cb = {};
  }

  getTemplate() {
    throw new Error(`Method isn't implemented`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default AbstractView;