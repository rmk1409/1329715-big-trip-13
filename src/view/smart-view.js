import AbstractView from "./abstract-view";

export default class SmartView extends AbstractView {
  restoreHandlers() {
    throw new Error(`Must be implemented.`);
  }

  updateElement() {
    // remove old DOM element
    // create new DOM element
    // replace old to new
    // invoke restoreHandlers
  }

  updateData() {
    // update Data
    // invoke updateElement
  }
}
