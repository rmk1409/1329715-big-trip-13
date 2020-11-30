import Util from "../mock/util";

const createTripInfoTemplate = (points) => {
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  const firstCity = firstPoint.destination;
  const secondCity = points.length > 3 ? `...` : points[1].destination;
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

class TripInfo {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = Util.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripInfo;
