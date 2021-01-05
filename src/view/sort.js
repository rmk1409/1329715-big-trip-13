import AbstractView from "./abstract-view";
import {SortMode} from "../presenter/trip";

const createSortTemplate = (currentSortMode) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortMode === SortMode.DEFAULT ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortMode === SortMode.TIME ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortMode === SortMode.PRICE ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;
};

class Sort extends AbstractView {
  constructor(currentSortMode) {
    super();

    this._currentSortMode = currentSortMode;
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  _sortChangeHandler(evt) {
    evt.preventDefault();
    this._cb.sortChange(evt.target.htmlFor);
  }

  setSortChangeHandler(cb) {
    this._cb.sortChange = cb;
    this.getElement().addEventListener(`click`, this._sortChangeHandler);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortMode);
  }
}

export default Sort;
