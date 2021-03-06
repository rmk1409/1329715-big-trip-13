import Offer from "./offer";
import {getDateDifference} from "../util/point";
import SmartView from './smart-view';

const createTripEventsItemTemplate = (point) => {
  const {startDate, type, destination, endDate, price, offers, isFavorite} = point;
  const evt = `${type} ${destination}`.trim();
  const diff = getDateDifference(startDate, endDate);

  const offersMarkup = new Offer(offers).getTemplate();

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime=${startDate.format(`YYYY-MM-DD`)}>${startDate.format(`DD MMM`)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${evt}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${startDate.format(`YYYY-MM-DDTHH:mm`)}>${startDate.format(`HH:mm`)}</time>
                    &mdash;
                    <time class="event__end-time" datetime=${endDate.format(`YYYY-MM-DDTHH:mm`)}>${endDate.format(`HH:mm`)}</time>
                  </p>
                  <p class="event__duration">${diff}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                    ${offersMarkup}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? `event__favorite-btn--active` : ``}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

class TripEventsItem extends SmartView {
  constructor(point) {
    super(point);
    this._clickArrowHandler = this._clickArrowHandler.bind(this);
    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);
  }

  _clickArrowHandler(evt) {
    evt.preventDefault();
    this._cb.clickArrow();
  }

  _clickFavoriteHandler(evt) {
    evt.preventDefault();
    this._cb.clickFavorite();
  }

  getTemplate() {
    return createTripEventsItemTemplate(this._state);
  }

  setClickArrowHandler(cb) {
    this._cb.clickArrow = cb;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickArrowHandler);
  }

  setClickFavoriteHandler(cb) {
    this._cb.clickFavorite = cb;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._clickFavoriteHandler);
  }

  restoreHandlers() {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._clickFavoriteHandler);
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickArrowHandler);
  }
}

export default TripEventsItem;
