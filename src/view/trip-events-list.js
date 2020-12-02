import AbstractView from "./abstract-view";

const createTripEventsList = () => {
  return `<ul class="trip-events__list">
          </ul>`;
};

class TripEventsList extends AbstractView {
  getTemplate() {
    return createTripEventsList();
  }
}

export default TripEventsList;
