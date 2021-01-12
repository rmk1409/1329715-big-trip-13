import EditOffers from "./edit-offers";
import SmartView from "./smart-view";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

const MIN_START_END_DATE_DIFFERENCE_IN_MINUTES = 5;

const createDestinationList = (destinationModel) => {
  const cities = Array.from(destinationModel.destinations.keys());
  return cities.slice()
    .map((city) => `<option value="${city}"></option>`).join(``);
};

const createPointTypeList = (point, offersModel) => {
  const {id, type} = point;
  const types = Array.from(offersModel.offers.keys());
  return types.map((typeName) => {
    typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    const lowerCaseName = typeName.toLowerCase();
    return `
      <div class="event__type-item">
        <input id="event-type-${lowerCaseName}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseName}" ${type === typeName ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${lowerCaseName}" for="event-type-${lowerCaseName}-${id}">${typeName}</label>
    </div>
`;
  }).join(``);
};

const getPhotos = (photos) => {
  return photos.length > 0 ? photos.map(({
    src,
    photoDescription,
  }) => {
    return `<img class="event__photo" src="${src}" alt="${photoDescription}">`;
  }).join(``) : ``;
};

const getDestination = (point) => {
  const {
    info: {description = ``, pictures = []},
  } = point;
  let res = ``;
  if (description) {
    res = `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                    ${getPhotos(pictures)}
                </div>
              </div>
            </section>`;
  }

  return res;
};

const getRollupButton = (isNew) => {
  return isNew ? `` : ` <button class="event__rollup-btn" type="button">
                          <span class="visually-hidden">Open event</span>
                        </button>`;
};

const createEditFormTemplate = (point, offerModel, destinationModel, isNewForm) => {
  const {
    id = ``,
    type = offerModel.offers.keys()[0],
    destination = ``,
    startDate, endDate,
    price = ``,
    isSaving,
    isDeleting,
  } = point;

  const startDateAndTime = startDate ? startDate.format(`DD/MM/YY MM:HH`) : ``;
  const endDateAndTime = endDate ? endDate.format(`DD/MM/YY MM:HH`) : ``;

  const isDisabled = !!isSaving || !!isDeleting;
  const disabledAttribute = isDisabled ? `disabled` : ``;
  let resetButtonText = `Cancel`;
  if (!isNewForm) {
    resetButtonText = isDeleting ? `Deleting` : `Delete`;
  }
  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type.toLowerCase() : `taxi`}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox" ${disabledAttribute}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createPointTypeList(point, offerModel)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination}" list="destination-list-${id}" required ${disabledAttribute}>
                    <datalist id="destination-list-${id}">
                        ${createDestinationList(destinationModel)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startDateAndTime}" ${disabledAttribute}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endDateAndTime}" ${disabledAttribute}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}" required ${disabledAttribute}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${disabledAttribute}>${isSaving ? `Saving` : `Save`}</button>
                  <button class="event__reset-btn" type="reset" ${disabledAttribute}>${resetButtonText}</button>
                  ${getRollupButton(isNewForm)}
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    ${offerModel.getAvailableOffers(type).length > 0 ? ` <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                     <div class="event__available-offers">
                            ${new EditOffers(point, offerModel, isDisabled).getTemplate()}
                    </div>` : ``}
                  </section>

                  ${getDestination(point)}
                </section>
              </form>
            </li>`;
};

class EditForm extends SmartView {
  constructor(point, offerModel, destinationModel, isNewForm = false) {
    super(point);
    this._offerModel = offerModel;
    this._destinationModel = destinationModel;
    this._isNewForm = isNewForm;
    this._startDatePicker = null;
    this._endDatePicker = null;

    this._submitHandler = this._submitHandler.bind(this);
    this._clickArrowHandler = this._clickArrowHandler.bind(this);
    this._deleteHandler = this._deleteHandler.bind(this);

    this._pointTypeHandler = this._pointTypeHandler.bind(this);
    this._offerChooseHandler = this._offerChooseHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._changeStartDateHandler = this._changeStartDateHandler.bind(this);
    this._changeEndDateHandler = this._changeEndDateHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);

    this.setPointTypeHandler();
    this.setOfferChooseHandler();
    this.setChangeDestinationHandler();
    this.setChangePriceHandler();
    this._setDatePickers();
  }

  _setDatePickers() {
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }
    if (this._endDatePicker) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }

    const startTimeSettings = {
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this._state.startDate.toDate(),
      onChange: this._changeStartDateHandler,
      maxDate: this._state.endDate.add(-MIN_START_END_DATE_DIFFERENCE_IN_MINUTES, `minute`).toDate(),
    };

    const endTimeSettings = {
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this._state.endDate.toDate(),
      onChange: this._changeEndDateHandler,
      minDate: this._state.startDate.add(MIN_START_END_DATE_DIFFERENCE_IN_MINUTES, `minute`).toDate(),
    };

    this._startDatePicker = flatpickr(this.getElement().querySelector(`.event__input--time[name=event-start-time]`), startTimeSettings);

    this._endDatePicker = flatpickr(this.getElement().querySelector(`.event__input--time[name=event-end-time]`), endTimeSettings);
  }

  _changeStartDateHandler([userDate]) {
    this.updateData({startDate: dayjs(userDate)}, false);
    if (this._endDatePicker) {
      this._endDatePicker.set(`minDate`, this._state.startDate.add(MIN_START_END_DATE_DIFFERENCE_IN_MINUTES, `minute`).toDate());
    }
  }

  _changeEndDateHandler([userDate]) {
    this.updateData({endDate: dayjs(userDate)}, false);
    if (this._startDatePicker) {
      this._startDatePicker.set(`maxDate`, this._state.endDate.add(-MIN_START_END_DATE_DIFFERENCE_IN_MINUTES, `minute`).toDate());
    }
  }

  _checkIsValidForm() {
    const element = this.getElement();
    const price = +element.querySelector(`.event__input--price`).value;
    const destination = element.querySelector(`.event__input--destination`).value;
    const saveButton = element.querySelector(`.event__save-btn`);
    const cities = Array.from(this._destinationModel.destinations.keys());
    const isInputDataValid = Number.isInteger(price) && cities.indexOf(destination) !== -1;
    saveButton.disabled = !isInputDataValid;
  }

  _changePriceHandler(evt) {
    const newPrice = evt.target.value;
    this.updateData({price: +newPrice}, false);
    this._checkIsValidForm();
  }

  setChangePriceHandler() {
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._changePriceHandler);
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    const newDestination = evt.target.value;
    if (newDestination) {
      const pointInfo = this._destinationModel.getDestinationInfo(newDestination);
      const isEmpty = (Object.keys(pointInfo).length === 0) && (pointInfo.constructor === Object);
      if ((this._state.destination !== newDestination) && !isEmpty) {
        this.updateData({info: pointInfo, destination: newDestination});
      }
      this._checkIsValidForm();
    }
  }

  setChangeDestinationHandler() {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, this._changeDestinationHandler);
  }

  _pointTypeHandler(evt) {
    evt.preventDefault();
    const value = evt.target.value;
    this.updateData({type: value, offers: []});
  }

  setPointTypeHandler() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._pointTypeHandler);
  }

  _offerChooseHandler(evt) {
    evt.preventDefault();

    const title = evt.target.name;
    const isChecked = evt.target.checked;
    const availableOffers = this._offerModel.getAvailableOffers(this._state.type);
    const pointOffers = this._state.offers.slice();

    const offer = availableOffers.find((curOffer) => curOffer.title === title);
    if (isChecked) {
      pointOffers.push(offer);
    } else {
      pointOffers.splice(pointOffers.indexOf(offer), 1);
    }
    this.updateData({offers: pointOffers}, false);
  }

  setOfferChooseHandler() {
    const offersElement = this.getElement().querySelector(`.event__available-offers`);
    if (offersElement) {
      offersElement.addEventListener(`change`, this._offerChooseHandler);
    }
  }

  setSubmitHandler(cb) {
    this._cb.submit = cb;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._cb.submit(this._state);
  }

  _clickArrowHandler(evt) {
    evt.preventDefault();
    this._cb.clickArrow();
  }

  setClickArrowHandler(cb) {
    this._cb.clickArrow = cb;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickArrowHandler);
  }

  setDeleteButtonHandler(cb) {
    this._cb.clickDelete = cb;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteHandler);
  }

  _deleteHandler(evt) {
    evt.preventDefault();
    this._cb.clickDelete();
  }

  getTemplate() {
    return createEditFormTemplate(this._state, this._offerModel, this._destinationModel, this._isNewForm);
  }

  restoreHandlers() {
    const rollupButton = this.getElement().querySelector(`.event__rollup-btn`);
    if (rollupButton) {
      rollupButton.addEventListener(`click`, this._clickArrowHandler);
    }
    this.getElement().addEventListener(`submit`, this._submitHandler);
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._pointTypeHandler);
    this.setOfferChooseHandler();
    this.setChangeDestinationHandler();
    this._setDatePickers();
    this.setChangePriceHandler();
  }
}

export default EditForm;
