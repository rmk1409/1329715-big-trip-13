import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortTemplate} from './view/sort.js';
import {createTripEventsList} from './view/trip-events-list.js';
import {createEditFormTemplate} from './view/edit-form';
import {createTripEventsItemTemplate} from './view/trip-events-item';

import {generatePoint} from "./mock/point";

const ITEM_COUNT = 20;

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const menuHeader = tripControls.querySelector(`h2:first-child`);
const filterHeader = tripControls.querySelector(`h2:nth-child(2)`);
const tripEvents = document.querySelector(`.trip-events`);
const tripSortHeader = tripEvents.querySelector(`h2:first-child`);

render(menuHeader, createMenuTemplate(), `afterend`);
render(filterHeader, createFiltersTemplate(), `afterend`);

render(tripSortHeader, createSortTemplate(), `afterend`);
render(tripEvents, createTripEventsList(), `beforeend`);

const points = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  points.push(generatePoint());
}

points.sort((a, b) => a.startDate.isBefore(b.startDate) ? -1 : 1);

const tripEventsList = tripEvents.querySelector(`.trip-events__list`);
render(tripEventsList, createEditFormTemplate(points[0]), `afterbegin`);

for (let i = 1; i < points.length; i++) {
  render(tripEventsList, createTripEventsItemTemplate(points[i]), `beforeend`);
}

render(tripMain, createTripInfoTemplate(points), `afterbegin`);
render(tripMain.querySelector(`.trip-info`), createTripCostTemplate(points), `beforeend`);
