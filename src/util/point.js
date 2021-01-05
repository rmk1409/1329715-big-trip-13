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

export {getDateDifference};
