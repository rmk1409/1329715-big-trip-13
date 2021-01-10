import AbstractView from "./abstract-view";

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
            <a class="trip-tabs__btn" href="#">Stats</a>
          </nav>`;
};

const LINK_TAG_NAME = `A`;
const ACTIVE_MENU_CLASS = `trip-tabs__btn--active`;

class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    const element = evt.target;

    if (element.tagName === LINK_TAG_NAME && !element.classList.contains(ACTIVE_MENU_CLASS)) {
      this.getElement().querySelector(`.${ACTIVE_MENU_CLASS}`).classList.remove(ACTIVE_MENU_CLASS);
      element.classList.add(ACTIVE_MENU_CLASS);

      this._cb.clickMenu(element.textContent);
    }
  }

  resetMenuItems() {
    const menuItems = this.getElement().querySelectorAll(`a.trip-tabs__btn`);
    menuItems.forEach((item)=>item.classList.remove(ACTIVE_MENU_CLASS));
    menuItems[0].classList.add(ACTIVE_MENU_CLASS);
  }

  setMenuClickHandler(menuClickHandler) {
    this._cb.clickMenu = menuClickHandler;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}

export {Menu};
