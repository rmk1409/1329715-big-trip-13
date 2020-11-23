import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortTemplate} from './view/sort.js';
import {createTripEventsList} from './view/trip-events-list.js';
import {createEditFormTemplate} from './view/edit-form';
import {createTripEventsItemTemplate} from './view/trip-events-item';

const ITEM_COUNT = 3;

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const menuHeader = tripControls.querySelector(`h2:first-child`);
const filterHeader = tripControls.querySelector(`h2:nth-child(2)`);
const tripEvents = document.querySelector(`.trip-events`);
const tripSortHeader = tripEvents.querySelector(`h2:first-child`);

render(tripMain, createTripInfoTemplate(), `afterbegin`);
render(tripMain.querySelector(`.trip-info`), createTripCostTemplate(), `beforeend`);
render(menuHeader, createMenuTemplate(), `afterend`);
render(filterHeader, createFiltersTemplate(), `afterend`);

render(tripSortHeader, createSortTemplate(), `afterend`);
render(tripEvents, createTripEventsList(), `beforeend`);

const tripEventsList = tripEvents.querySelector(`.trip-events__list`);
render(tripEventsList, createEditFormTemplate(), `afterbegin`);

for (let i = 0; i < ITEM_COUNT; i++) {
  render(tripEventsList, createTripEventsItemTemplate(), `beforeend`);
}
