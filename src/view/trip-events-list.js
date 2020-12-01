import {createElement} from "../utils";

const createTripEventsList = () => {
  return `<ul class="trip-events__list">
          </ul>`;
};

class TripEventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsList();
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

export default TripEventsList;
