import {getRandomValueOfArray} from "../util/common";
import {CITIES} from "./point";

const MAX_DESCRIPTION_LENGTH = 5;
const MAX_PHOTO_COUNT = 7;

let destinationInfo = null;

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const getDescription = () => {
  const descriptions = new Set();
  const descriptionCount = Math.ceil(Math.random() * MAX_DESCRIPTION_LENGTH);
  while (descriptions.size < descriptionCount) {
    descriptions.add(getRandomValueOfArray(DESCRIPTIONS));
  }
  return Array.from(descriptions).join(``);
};

const getPhoto = () => {
  const photos = [];
  const photoCount = Math.ceil(Math.random() * MAX_PHOTO_COUNT);
  for (let i = 0; i < photoCount; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

const initInfo = () => {
  destinationInfo = new Map();
  CITIES.forEach((destination) => {
    destinationInfo.set(destination, {
      description: getDescription(),
      photos: getPhoto(),
    });
  });
};

const getInfo = (destination) => {
  if (!destinationInfo) {
    initInfo();
  }
  return destinationInfo.get(destination);
};

export {getInfo, destinationInfo};
