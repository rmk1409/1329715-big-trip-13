import AbstractView from "./abstract-view";

const POINT_COUNT_FOR_DOTS_FORMAT = 3;

const createTripInfoTemplate = (points) => {
  let firstCity = ``;
  let secondCity = ``;
  let thirdCity = ``;
  let startDate = ``;
  let endDate = ``;

  if (points.length) {
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];

    firstCity = firstPoint.destination;
    if (points[1]) {
      secondCity = points.length > POINT_COUNT_FOR_DOTS_FORMAT ? `...` : points[1].destination;
    }
    thirdCity = lastPoint.destination;

    startDate = firstPoint.startDate.format(`MMM DD`);
    endDate = lastPoint.endDate.format(`MMM DD`);

    if (firstPoint.startDate.month() === lastPoint.endDate.month()) {
      endDate = lastPoint.endDate.format(`DD`);
    }
  }

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${firstCity} &mdash; ${secondCity} &mdash; ${thirdCity}</h1>

              <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
            </div>
          </section>`;
};

class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}

export default TripInfo;
