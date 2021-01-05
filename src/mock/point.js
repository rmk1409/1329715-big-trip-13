import {getRandomNumber, getRandomValueOfArray} from "../util/common";
import {getAvailableOffers, getOffers} from "./offer";
import {getInfo} from "./info";
import dayjs from "dayjs";

const MIN_POINT_PRICE = 10;
const MAX_POINT_PRICE = 1000;


const MIN_START_DATE_IN_MINUTES = -5000;
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

const setOffers = (point) => {
  point.offers = getOffers(point.type);
};
const setInfo = (point) => {
  point.info = getInfo(point.destination);
};

const createIdGenerator = () => {
  let i = 1;
  return () => i++;
};

const getNextId = createIdGenerator();

const generatePoint = () => {
  const point = {
    id: getNextId(),
    type: getRandomValueOfArray(TYPES),
    destination: getRandomValueOfArray(CITIES),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    price: getRandomNumber(MIN_POINT_PRICE, MAX_POINT_PRICE),
  };
  setInfo(point);
  setOffers(point);
  point.availableOffers = getAvailableOffers(point.type);
  setDates(point);
  return point;
};

export {generatePoint, CITIES, TYPES, getNextId};
