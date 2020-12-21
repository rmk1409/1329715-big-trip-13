import {CITIES, TYPES} from "../mock/point";
import EditOffers from "./edit-offers";
import SmartView from "./smart-view";
import {getAvailableOffers} from "../mock/offer";

const createDestinationlist = () => {
  return CITIES.slice()
    .map((city) => `<option value="${city}"></option>`).join(``);
};

const createPointTypeList = (point) => {
  const {id, type} = point;
  return TYPES.map((typeName) => {
    const lowerCaseName = typeName.toLowerCase();
    return `
      <div class="event__type-item">
        <input id="event-type-${lowerCaseName}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseName}" ${type === typeName ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${lowerCaseName}" for="event-type-${lowerCaseName}-${id}">${typeName}</label>
    </div>
`;
  }).join(``);
};

const createEditFormTemplate = (point) => {
  const {
    id = ``,
    type = ``,
    destination = ``,
    startDate, endDate,
    price = ``,
    info: {description = ``, photos = []},
  } = point;

  const startDateAndTime = startDate ? startDate.format(`DD/MM/YY MM:HH`) : ``;
  const endDateAndTime = endDate ? endDate.format(`DD/MM/YY MM:HH`) : ``;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type.toLowerCase() : `taxi`}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createPointTypeList(point)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                        ${createDestinationlist()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startDateAndTime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endDateAndTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    ${getAvailableOffers(type).length > 0 ? ` <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                     <div class="event__available-offers">
                            ${new EditOffers(point).getTemplate()}
                    </div>` : ``}
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                          ${photos.length > 0 ? photos.map((src) => `<img class="event__photo" src="${src}" alt="Event photo">`).join(``) : ``}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

class EditForm extends SmartView {
  constructor(point) {
    super(point);
    this._submitHandler = this._submitHandler.bind(this);
    this._clickArrowHandler = this._clickArrowHandler.bind(this);

    this._pointTypeHandler = this._pointTypeHandler.bind(this);

    this.setPointTypeHandler();
  }

  _pointTypeHandler(evt) {
    evt.preventDefault();
    let value = evt.target.value;
    value = `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
    this.updateData({type: value, offers: []});
  }

  setPointTypeHandler() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._pointTypeHandler);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._cb.submit();
  }

  _clickArrowHandler(evt) {
    evt.preventDefault();
    this._cb.clickArrow();
  }

  setSubmitHandler(cb) {
    this._cb.submit = cb;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }

  setClickArrowHandler(cb) {
    this._cb.clickArrow = cb;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickArrowHandler);
  }

  getTemplate() {
    return createEditFormTemplate(this._state);
  }

  restoreHandlers() {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickArrowHandler);
    this.getElement().addEventListener(`submit`, this._submitHandler);
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._pointTypeHandler);
  }

  // #3
  // when changing `point type` show correct `option set`
  // when choosing `point destination` show new `description & photos`

  // #4
  // When replacing component it's need to to restoreHandlers
}

export default EditForm;
