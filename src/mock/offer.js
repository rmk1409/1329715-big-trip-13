import {getRandomValueOfArray} from "../utils/common";

const OFFERS_MAP = new Map();
OFFERS_MAP.set(`food`, [
  {
    type: `food`,
    name: `Add meal`,
    price: 27,
  },
]);
OFFERS_MAP.set(`seats`, [
  {
    type: `seats`,
    name: `Choose seats`,
    price: 15,
  },
]);
OFFERS_MAP.set(`transfer`, [
  {
    type: `transfer`,
    name: `Add luggage`,
    price: 30,
  },
  {
    type: `transfer`,
    name: `Add insurance`,
    price: 40,
  },
  {
    type: `transfer`,
    name: `Switch to comfort class`,
    price: 100,
  },
]);

const POINT_OFFER_TYPES = new Map();
POINT_OFFER_TYPES.set(`Taxi`, [`transfer`]);
POINT_OFFER_TYPES.set(`Bus`, [`transfer`, `seats`]);
POINT_OFFER_TYPES.set(`Train`, [`transfer`, `seats`, `food`]);
POINT_OFFER_TYPES.set(`Ship`, [`transfer`, `seats`, `food`]);
POINT_OFFER_TYPES.set(`Transport`, [`transfer`]);
POINT_OFFER_TYPES.set(`Drive`, []);
POINT_OFFER_TYPES.set(`Flight`, [`transfer`, `seats`, `food`]);
POINT_OFFER_TYPES.set(`Check-in`, [`food`]);
POINT_OFFER_TYPES.set(`Sightseeing`, [`food`]);
POINT_OFFER_TYPES.set(`Restaurant`, [`seats`]);

const getAvailableOffers = (pointType) => {
  const availableOffers = [];
  POINT_OFFER_TYPES.get(pointType)
    .map((offerType) => OFFERS_MAP.get(offerType))
    .forEach((offerOptions) => availableOffers.push(...offerOptions));
  return availableOffers;
};

const getOffers = (pointType) => {
  const availableOffers = getAvailableOffers(pointType);
  let offers = [];
  if (availableOffers.length) {
    const offerSet = new Set();
    const offersCount = (Math.random() * availableOffers.length).toFixed();
    while (offerSet.size < offersCount) {
      offerSet.add(getRandomValueOfArray(availableOffers));
    }
    offers = Array.from(offerSet);
  }
  return offers;
};

export {getOffers, getAvailableOffers};
