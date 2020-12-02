import AbstractView from "./abstract-view";

const createEmptyListTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

class ListEmpty extends AbstractView {
  getTemplate() {
    return createEmptyListTemplate();
  }
}

export default ListEmpty;
