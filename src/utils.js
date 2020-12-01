const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};

const getRandomValueOfArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min, max) => {
  return +((Math.random() * (max - min) + min).toFixed());
};

const zeroPad = (num, places) => {
  return String(num).padStart(places, `0`);
};

const getDateDifference = (startDate, endDate) => {
  const MIN_IN_HOUR = 60;
  const HOUR_IN_DAY = 24;

  const diffMinutes = endDate.diff(startDate, `minute`) % MIN_IN_HOUR;
  const diffHours = endDate.diff(startDate, `hour`) % HOUR_IN_DAY;
  const diffDays = endDate.diff(startDate, `day`);

  let diff = `${zeroPad(diffMinutes, 2)}M`;
  if (diffHours > 0 || diffDays > 0) {
    diff = `${zeroPad(diffHours, 2)}H ${diff}`;
    if (diffDays > 0) {
      diff = `${zeroPad(diffDays, 2)}D ${diff}`;
    }
  }

  return diff;
};

const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;

  return div.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER_END:
      container.parentNode.insertBefore(element, container.nextSibling);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
  }
};

export {getRandomValueOfArray, getRandomNumber, createElement, getDateDifference, render};
