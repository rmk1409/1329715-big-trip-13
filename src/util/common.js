const getRandomValueOfArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min, max) => {
  return +((Math.random() * (max - min) + min).toFixed());
};

const isOnline = () => {
  return window.navigator.onLine;
};

export {getRandomValueOfArray, getRandomNumber, isOnline};
