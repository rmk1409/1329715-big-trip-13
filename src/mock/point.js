import {getRandomNumber, getRandomValueOfArray} from "../utils/common";
import {getOffers} from "./offer";
import {getInfo} from "./info";
import dayjs from "dayjs";

const MIN_POINT_PRICE = 10;
const MAX_POINT_PRICE = 1000;


const MIN_START_DATE_IN_MINUTES = 0;
const MAX_START_DATE_IN_MINUTES = 5000;

const MIN_POINT_DURATION_IN_MIN = 1;
const MAX_POINT_DURATION_IN_MIN = 5000;

const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Kiev`, `Saint-P`, `Amsterdam`, `Nicosia`, `New York`, `Podgorica`, `Belgrade`];

const setDates = (point) => {
  const startDate = dayjs().add(getRandomNumber(MIN_START_DATE_IN_MINUTES, MAX_START_DATE_IN_MINUTES), `minute`);
  const endDate = dayjs(startDate).add(getRandomNumber(MIN_POINT_DURATION_IN_MIN, MAX_POINT_DURATION_IN_MIN), `minute`);
  point.startDate = startDate;
  point.endDate = endDate;
};

const getPointIDGenerator = () => {
  let i = 1;
  return () => {
    return i++;
  };
};

const idGenerator = getPointIDGenerator();

const generatePoint = () => {
  const point = {
    id: idGenerator(),
    type: getRandomValueOfArray(TYPES),
    destination: getRandomValueOfArray(CITIES),
    offers: getOffers(),
    info: getInfo(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    price: getRandomNumber(MIN_POINT_PRICE, MAX_POINT_PRICE)
  };
  setDates(point);
  return point;
};

export {generatePoint, CITIES};
