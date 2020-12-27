import dayjs from "dayjs";

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const FilterFunctions = new Map();
FilterFunctions.set(FilterType.EVERYTHING, (points) => points);
FilterFunctions.set(FilterType.FUTURE, (points) => points.filter((point) => dayjs().isAfter(point.startDate)));
FilterFunctions.set(FilterType.PAST, (points) => points.filter((point) => dayjs().isBefore(point.startDate)));

class Filter {
  constructor() {
    this._activeFilter = FilterType.EVERYTHING;
  }

  get activeFilter() {
    return this._activeFilter;
  }

  set activeFilter(newFilter) {
    if (newFilter !== this._activeFilter) {
      this._activeFilter = newFilter;
    }
  }
}

export {Filter, FilterFunctions, FilterType};
