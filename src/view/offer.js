import AbstractView from "./abstract-view";

const createOfferTemplate = (offer) => {
  const {name, price} = offer;
  return `<li class="event__offer">
            <span class="event__offer-title">${name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;
};

class Offer extends AbstractView {
  constructor(offers) {
    super();
    this._offers = offers;
  }

  getTemplate() {
    return this._offers.map((offer)=>createOfferTemplate(offer)).join(``);
  }
}

export default Offer;
