import AbstractView from "./abstract-view";
import {FilterFunctions, FilterType} from "../model/filter";

const createFiltersTemplate = (points, currentChosenFilter) => {
  const isFuturePresent = FilterFunctions.get(FilterType.FUTURE)(points).length;
  const isPastPresent = FilterFunctions.get(FilterType.PAST)(points).length;

  const isEverythingChosen = currentChosenFilter === FilterType.EVERYTHING;
  const isFutureChosen = currentChosenFilter === FilterType.FUTURE;
  const isPastChosen = currentChosenFilter === FilterType.PAST;

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
  constructor(points, currentChosenFilter) {
    super();
    this._points = points;
    this._currentChosenFilter = currentChosenFilter;
  }

  getTemplate() {
    return createFiltersTemplate(this._points, this._currentChosenFilter);
  }
}

export {Filters};
