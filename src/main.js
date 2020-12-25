import {generatePoint} from "./mock/point";
import {Trip} from './presenter/trip';
import Points from "./model/points";

const ITEM_COUNT = 0;

const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const points = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  points.push(generatePoint());
}

const pointsModel = new Points();
pointsModel.tripPoints = points;

new Trip(tripMain, tripEvents, pointsModel).init();
