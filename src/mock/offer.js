import {getRandomValueOfArray} from "../util/common";

const addMeal = {title: `Add meal`, price: 27};
const chooseSeats = {title: `Choose seats`, price: 15};
const addLuggage = {title: `Add luggage`, price: 30};
const addInsurance = {title: `Add insurance`, price: 40};
const switchToComfortClass = {title: `Switch to comfort class`, price: 100};

const POINT_OFFER_TYPES = new Map();
POINT_OFFER_TYPES.set(`Taxi`, [addLuggage, addInsurance, switchToComfortClass]);
POINT_OFFER_TYPES.set(`Bus`, [addLuggage, addInsurance, switchToComfortClass, chooseSeats]);
POINT_OFFER_TYPES.set(`Train`, [addLuggage, addInsurance, switchToComfortClass, chooseSeats, addMeal]);
POINT_OFFER_TYPES.set(`Ship`, [addLuggage, addInsurance, switchToComfortClass, chooseSeats, addMeal]);
POINT_OFFER_TYPES.set(`Transport`, [addLuggage, addInsurance, switchToComfortClass]);
POINT_OFFER_TYPES.set(`Drive`, []);
POINT_OFFER_TYPES.set(`Flight`, [addLuggage, addInsurance, switchToComfortClass, chooseSeats, addMeal]);
POINT_OFFER_TYPES.set(`Check-in`, [addMeal]);
POINT_OFFER_TYPES.set(`Sightseeing`, [addMeal]);
POINT_OFFER_TYPES.set(`Restaurant`, [chooseSeats]);

const getAvailableOffers = (pointType) => {
  return POINT_OFFER_TYPES.get(pointType) || [];
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
