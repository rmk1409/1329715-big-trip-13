import {generatePoint} from "./mock/point";
import {Trip as TripPresenter} from './presenter/trip';
import {Points as PointsModel} from "./model/points";
import {Filter as FilterPresenter} from "./presenter/filter";
import {Filter as FilterModel} from "./model/filter";

const ITEM_COUNT = 20;

const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);
const filterHeader = tripMain.querySelector(`.trip-controls h2:nth-of-type(2)`);

const points = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  points.push(generatePoint());
}

const pointsModel = new PointsModel(points);
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripMain, tripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterHeader, pointsModel, filterModel);
tripPresenter.init();
filterPresenter.init();

const newPointButton = tripMain.querySelector(`.trip-main__event-add-btn`);
newPointButton.addEventListener(`click`, tripPresenter.openNewPointForm);
