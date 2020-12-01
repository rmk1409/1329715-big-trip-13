import TripInfo from './view/trip-info.js';
import TripCost from './view/trip-cost.js';
import Menu from './view/menu.js';
import Filters from './view/filters.js';
import Sort from './view/sort.js';
import TripEventsList from './view/trip-events-list.js';
import EditForm from './view/edit-form';
import TripEventsItem from './view/trip-events-item';

import {generatePoint} from "./mock/point";
import ListEmpty from "./view/list-empty";
import {render} from "./utils";

const ITEM_COUNT = 20;

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const menuHeader = tripControls.querySelector(`h2:first-child`);
const filterHeader = tripControls.querySelector(`h2:nth-child(2)`);
const tripEvents = document.querySelector(`.trip-events`);
const tripSortHeader = tripEvents.querySelector(`h2:first-child`);

render(menuHeader, new Menu().getElement(), `afterend`);
render(filterHeader, new Filters().getElement(), `afterend`);
render(tripSortHeader, new Sort().getElement(), `afterend`);
render(tripEvents, new TripEventsList().getElement(), `beforeend`);

const points = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  points.push(generatePoint());
}
points.sort((a, b) => a.startDate.isBefore(b.startDate) ? -1 : 1);

const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

let closedEditFormFlag = true;

const renderPoint = (point) => {
  const editFormElement = new EditForm(point).getElement();
  const evtElement = new TripEventsItem(point).getElement();

  const itemToForm = () => {
    closedEditFormFlag = false;
    tripEventsList.replaceChild(editFormElement, evtElement);
  };
  const formToItem = () => {
    closedEditFormFlag = true;
    tripEventsList.replaceChild(evtElement, editFormElement);
  };

  const onEscKeyDown = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      formToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  evtElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    if (closedEditFormFlag) {
      itemToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });
  editFormElement.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    formToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  editFormElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    formToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventsList, evtElement, `beforeend`);
};

if (points.length === 0) {
  render(tripEvents, new ListEmpty().getElement(), `beforeend`);
} else {
  for (let i = 0; i < points.length; i++) {
    renderPoint(points[i]);
  }
}

render(tripMain, new TripInfo(points).getElement(), `afterbegin`);
render(tripMain.querySelector(`.trip-info`), new TripCost(points).getElement(), `beforeend`);
