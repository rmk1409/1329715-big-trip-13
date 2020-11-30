import TripInfo from './view/trip-info.js';
import TripCost from './view/trip-cost.js';
import Menu from './view/menu.js';
import Filters from './view/filters.js';
import Sort from './view/sort.js';
import TripEventsList from './view/trip-events-list.js';
import EditForm from './view/edit-form';
import TripEventsItem from './view/trip-events-item';
import Util from "./mock/util";

import {generatePoint} from "./mock/point";

const ITEM_COUNT = 20;

const util = new Util();
const filters = new Filters();
const menu = new Menu();
const sort = new Sort();
const tripEventsListView = new TripEventsList();

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const menuHeader = tripControls.querySelector(`h2:first-child`);
const filterHeader = tripControls.querySelector(`h2:nth-child(2)`);
const tripEvents = document.querySelector(`.trip-events`);
const tripSortHeader = tripEvents.querySelector(`h2:first-child`);

util.render(menuHeader, menu.getElement(), `afterend`);
util.render(filterHeader, filters.getElement(), `afterend`);

util.render(tripSortHeader, sort.getElement(), `afterend`);
util.render(tripEvents, tripEventsListView.getElement(), `beforeend`);

const points = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  points.push(generatePoint());
}

points.sort((a, b) => a.startDate.isBefore(b.startDate) ? -1 : 1);

const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

for (let i = 0; i < points.length; i++) {
  const editFormElement = new EditForm(points[i]).getElement();
  const evtElement = new TripEventsItem(points[i]).getElement();

  evtElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, function () {
    evtElement.parentNode.replaceChild(editFormElement, evtElement);
  });

  editFormElement.addEventListener(`submit`, function () {
    editFormElement.parentNode.replaceChild(evtElement, editFormElement);
  });

  util.render(tripEventsList, evtElement, `beforeend`);
}

const tripCost = new TripCost(points);
const tripInfo = new TripInfo(points);

util.render(tripMain, tripInfo.getElement(), `afterbegin`);
util.render(tripMain.querySelector(`.trip-info`), tripCost.getElement(), `beforeend`);
