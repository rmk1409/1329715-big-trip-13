import AbstractView from "./abstract-view";
import {getAvailableOffers} from "../mock/offer";

const getEditOffers = (point) => {
  const {id, offers: pointOffers} = point;
  return getAvailableOffers(point.type).map((curOffer) => {
    const {title, price} = curOffer;
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="${title}" ${pointOffers.indexOf(curOffer) === -1 ? `` : `checked`}>
              <label class="event__offer-label" for="event-offer-${title}-${id}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`;
  }).join(``);
};

class EditOffers extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return getEditOffers(this._point);
  }
}

export default EditOffers;
