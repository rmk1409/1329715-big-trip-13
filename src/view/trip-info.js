import AbstractView from "./abstract-view";

const POINT_COUNT_FOR_DOTS_FORMAT = 3;

const createTripInfoTemplate = (points) => {
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  const firstCity = firstPoint.destination;
  const secondCity = points.length > POINT_COUNT_FOR_DOTS_FORMAT ? `...` : points[1].destination;
  const thirdCity = lastPoint.destination;

  const startDate = firstPoint.startDate.format(`MMM DD`);
  let endDate = lastPoint.endDate.format(`MMM DD`);

  if (firstPoint.startDate.month() === lastPoint.endDate.month()) {
    endDate = lastPoint.endDate.format(`DD`);
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
