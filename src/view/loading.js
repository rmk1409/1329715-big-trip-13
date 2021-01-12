import AbstractView from "./abstract-view";

const createLoadingTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

class Loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}

export {Loading};
