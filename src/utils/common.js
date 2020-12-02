const getRandomValueOfArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min, max) => {
  return +((Math.random() * (max - min) + min).toFixed());
};

export {getRandomValueOfArray, getRandomNumber};
