import AbstractView from "./abstract-view";
import {FilterFunction, FilterType} from "../model/filter";

const createFiltersTemplate = (points, activeFilter) => {
  const isFuturePresent = FilterFunction.get(FilterType.FUTURE)(points).length;
  const isPastPresent = FilterFunction.get(FilterType.PAST)(points).length;

  const isEverythingChosen = activeFilter === FilterType.EVERYTHING;
  const isFutureChosen = activeFilter === FilterType.FUTURE;
  const isPastChosen = activeFilter === FilterType.PAST;

  return `<form class="trip-filters" action="#" method="get">
              <div class="trip-filters__filter">
                <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isEverythingChosen ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
              </div>

              <div class="trip-filters__filter">
                <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${isFuturePresent ? `` : `disabled`} ${isFutureChosen ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-future">Future</label>
              </div>

              <div class="trip-filters__filter">
                <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${isPastPresent ? `` : `disabled`} ${isPastChosen ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-past">Past</label>
              </div>

              <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

class Filters extends AbstractView {
  constructor(points, activeFilter) {
    super();
    this._points = points;
    this._activeFilter = activeFilter;
  }

  getTemplate() {
    return createFiltersTemplate(this._points, this._activeFilter);
  }
}

export {Filters};
