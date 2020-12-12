import {generatePoint} from "./mock/point";
import Trip from './presenter/Trip';

const ITEM_COUNT = 20;

const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const points = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  points.push(generatePoint());
}
points.sort((a, b) => a.startDate.isBefore(b.startDate) ? -1 : 1);

new Trip(tripMain, tripEvents).init(points);
