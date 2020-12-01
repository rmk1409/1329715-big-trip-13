import {createElement} from "../utils";

const createOfferTemplate = (offer) => {
  const {name, price} = offer;
  return `<li class="event__offer">
            <span class="event__offer-title">${name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;
};

class Offer {
  constructor(offers) {
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return this._offers.map((offer)=>createOfferTemplate(offer)).join(``);
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

export default Offer;
