import EditForm from '../view/edit-form';
import TripEventsItem from '../view/trip-events-item';
import {render, replace} from '../utils/render';

export default class Point {
  constructor(pointsListContainer) {
    this._pointsListContainer = pointsListContainer;

    this._pointToForm = this._pointToForm.bind(this);
    this._formToPoint = this._formToPoint.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(point) {
    this._editFormComponent = new EditForm(point);
    this._evtComponent = new TripEventsItem(point);

    this._evtComponent.setClickArrowHandler(() => {
      this._pointToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setSubmitHandler(() => {
      this._formToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setClickArrowHandler(() => {
      this._formToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this._pointsListContainer, this._evtComponent, `beforeend`);
  }

  _pointToForm() {
    replace(this._editFormComponent, this._evtComponent);
  }

  _formToPoint() {
    replace(this._evtComponent, this._editFormComponent);
  }

  _onEscKeyDown(evt) {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      this._formToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
