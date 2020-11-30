import Util from "../mock/util";

const createEmptyListTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

class ListEmpty {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Util.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default ListEmpty;
