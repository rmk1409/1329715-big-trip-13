import dayjs from "dayjs";
import Subject from "../util/pattern/observer/subject";
import {UpdateType} from "../util/const";

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const FilterFunctions = new Map();
FilterFunctions.set(FilterType.EVERYTHING, (points) => points);
FilterFunctions.set(FilterType.FUTURE, (points) => {
  const now = dayjs();
  return points.filter((point) => now.isSame(point.startDate) || now.isBefore(point.startDate));
});
FilterFunctions.set(FilterType.PAST, (points) => {
  const now = dayjs();
  return points.filter((point) => now.isSame(point.endDate) || now.isAfter(point.endDate));
});

class Filter extends Subject {
  constructor() {
    super(FilterType.EVERYTHING);
  }

  set state(newFilter) {
    if (newFilter !== this._state) {
      this._state = newFilter;
      this.notifyAllObservers();
    }
  }

  notifyAllObservers() {
    this._observers.forEach((observer) => observer.update(UpdateType.MAJOR));
  }

  get state() {
    return this._state;
  }
}

export {Filter, FilterFunctions, FilterType};