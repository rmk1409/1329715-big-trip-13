import {generatePoint} from "./mock/point";
import {Trip as TripPresenter} from './presenter/trip';
import {Points as PointsModel} from "./model/points";
import {Filter as FilterPresenter} from "./presenter/filter";
import {Filter as FilterModel} from "./model/filter";
import {Stats as StatsView} from "./view/stats";
import {render, RenderPosition} from "./util/render";
import {Menu as MenuView} from "./view/menu";

const ITEM_COUNT = 5;
const pageBody = document.querySelector(`.page-main .page-body__container`);
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = pageBody.querySelector(`.trip-events`);
const filterHeader = tripMain.querySelector(`.trip-controls h2:nth-of-type(2)`);

const points = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  points.push(generatePoint());
}

const pointsModel = new PointsModel(points);
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripMain, tripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterHeader, pointsModel, filterModel);
tripPresenter.init();
filterPresenter.init();

const newPointButton = tripMain.querySelector(`.trip-main__event-add-btn`);
newPointButton.addEventListener(`click`, tripPresenter.openNewPointForm);

const statsView = new StatsView(points);
render(pageBody, statsView, RenderPosition.BEFORE_END);

const menuClickHandler = (menuElement) => {
  const value = menuElement.textContent;
  switch (value) {
    case `Table`:
      statsView.hide();
      tripPresenter.show();
      break;
    case `Stats`:
      tripPresenter.hide();
      statsView.show();
      break;
    case `New event`:
      break;
  }
};

const menuView = new MenuView();
const menuHeader = tripMain.querySelector(`.trip-controls h2:first-child`);
render(menuHeader, menuView, RenderPosition.AFTER_END);
menuView.setMenuClickHandler(menuClickHandler);
