import dayjs from "dayjs";
import Observable from "../util/pattern/observer/observable";
import {UpdateType} from "../util/const";

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const FilterFunction = new Map();
FilterFunction.set(FilterType.EVERYTHING, (points) => points);
FilterFunction.set(FilterType.FUTURE, (points) => {
  const now = dayjs();
  return points.filter((point) => now.isSame(point.startDate) || now.isBefore(point.startDate));
});
FilterFunction.set(FilterType.PAST, (points) => {
  const now = dayjs();
  return points.filter((point) => now.isSame(point.endDate) || now.isAfter(point.endDate));
});

class Filter extends Observable {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  get activeFilter() {
    return this._activeFilter;
  }

  set activeFilter(newFilter) {
    if (newFilter !== this._activeFilter) {
      this._activeFilter = newFilter;
      super.notifyAllObservers(UpdateType.MAJOR);
    }
  }
}

export {Filter, FilterFunction, FilterType};
