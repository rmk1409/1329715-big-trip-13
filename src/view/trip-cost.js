import AbstractView from "./abstract-view";

const createTripCostTemplate = (points) => {
  const total = points.reduce((acc, curPoint) => {
    let totalPointPrice = acc + curPoint.price;

    curPoint.offers.forEach((curOffer) => {
      totalPointPrice += curOffer.price;
    });

    return totalPointPrice;
  }, 0);

  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
          </p>`;
};

class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}

export default TripCost;
