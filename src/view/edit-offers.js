import AbstractView from "./abstract-view";
import {getAvailableOffers} from "../mock/offer";
import {Offers} from "../model/offers";

const getEditOffers = (point, offerModel) => {
  const {id, offers: pointOffers} = point;
  return offerModel.getAvailableOffers(point.type).map((curAvailableOffer) => {
    const {title, price} = curAvailableOffer;
    const isChecked = pointOffers.findIndex((offer) => curAvailableOffer.title === offer.title) >= 0;
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="${title}" ${isChecked ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-${title}-${id}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`;
  }).join(``);
};

class EditOffers extends AbstractView {
  constructor(point, offerModel) {
    super();
    this._point = point;
    this._offerModel = offerModel;
  }

  getTemplate() {
    return getEditOffers(this._point, this._offerModel);
  }
}

export default EditOffers;
