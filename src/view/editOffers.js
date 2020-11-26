import {OFFERS} from "../mock/offer";

const getEditOffers = ({id, offers: pointOffers}) => {
  return OFFERS.map((curOffer) => {
    const {type, name, price} = curOffer;
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${pointOffers.indexOf(curOffer) === -1 ? `` : `checked`}>
              <label class="event__offer-label" for="event-offer-${type}-${id}">
                <span class="event__offer-title">${name}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`;
  }).join(``);
};

export {getEditOffers};
