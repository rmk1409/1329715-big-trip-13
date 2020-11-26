import {getRandomValueOfArray} from "./util";

const MAX_OFFER_COUNT = 5;

const OFFERS = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: 30
  },
  {
    type: `class`,
    name: `Switch to comfort class`,
    price: 100
  },
  {
    type: `food`,
    name: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: 15
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: 40
  }
];

const getOffers = () => {
  const offers = new Set();
  const offersCount = (Math.random() * MAX_OFFER_COUNT).toFixed();
  while (offers.size < offersCount) {
    offers.add(getRandomValueOfArray(OFFERS));
  }
  return Array.from(offers);
};

export {getOffers, OFFERS};
