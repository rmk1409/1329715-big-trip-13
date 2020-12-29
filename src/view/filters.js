import AbstractView from "./abstract-view";
import {FilterFunctions, FilterType} from "../model/filter";

const createFiltersTemplate = (points) => {
  const isFutureActive = FilterFunctions.get(FilterType.FUTURE)(points).length;
  const isPastActive = FilterFunctions.get(FilterType.PAST)(points).length;

  return `<form class="trip-filters" action="#" method="get">
              <div class="trip-filters__filter">
                <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
                <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
              </div>

              <div class="trip-filters__filter">
                <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${isFutureActive ? `` : `disabled`}>
                <label class="trip-filters__filter-label" for="filter-future">Future</label>
              </div>

              <div class="trip-filters__filter">
                <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${isPastActive ? `` : `disabled`}>
                <label class="trip-filters__filter-label" for="filter-past">Past</label>
              </div>

              <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

class Filters extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createFiltersTemplate(this._points);
  }
}

export {Filters};
