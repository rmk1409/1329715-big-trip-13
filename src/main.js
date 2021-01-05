import {generatePoint} from "./mock/point";
import {Trip as TripPresenter} from './presenter/trip';
import {Points as PointsModel} from "./model/points";
import {Filter as FilterPresenter} from "./presenter/filter";
import {Filter as FilterModel} from "./model/filter";

const ITEM_COUNT = 2;

const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);
const filterHeader = tripMain.querySelector(`.trip-controls h2:nth-of-type(2)`);

const points = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  points.push(generatePoint());
}

const pointsModel = new PointsModel(points);
const filterModel = new FilterModel();

new TripPresenter(tripMain, tripEvents, pointsModel, filterModel).init();
new FilterPresenter(filterHeader, filterModel, pointsModel).init();
