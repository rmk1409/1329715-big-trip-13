import {generatePoint} from "./mock/point";
import {Trip as TripPresenter} from './presenter/trip';
import {Points as PointsModel} from "./model/points";
import {Filter as FilterPresenter} from "./presenter/filter";
import {Filter as FilterModel} from "./model/filter";
import {Stats as StatsView} from "./view/stats";
import {remove, render, RenderPosition} from "./util/render";
import {Menu as MenuView} from "./view/menu";
import {MenuItem} from "./util/const";
import {Server} from "./server";
import {Offers as OffersModel} from "./model/offers";
import {Destination as DestinationModel} from "./model/destination";

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
newPointButton.addEventListener(`click`, () => menuClickHandler(`New event`));

const menuView = new MenuView();
const menuHeader = tripMain.querySelector(`.trip-controls h2:first-child`);
render(menuHeader, menuView, RenderPosition.AFTER_END);

let statsView = null;
const menuClickHandler = (value) => {
  switch (value) {
    case MenuItem.TABLE:
      remove(statsView);
      tripPresenter.show();
      break;
    case MenuItem.STATS:
      tripPresenter.hide();
      statsView = new StatsView(pointsModel.points);
      render(pageBody, statsView, RenderPosition.BEFORE_END);
      break;
    case MenuItem.NEW_EVENT:
      remove(statsView);
      menuView.resetMenuItems();
      tripPresenter.hide();
      tripPresenter.show();
      tripPresenter.openNewPointForm();
      break;
  }
};

menuView.setMenuClickHandler(menuClickHandler);

const endPoint = `https://13.ecmascript.pages.academy/big-trip/`;
const authorizationKey = `Basic z{NDj5DNr+].tL3g`;

const server = new Server(endPoint, authorizationKey);

const offersModel = new OffersModel();
const offersPromise = server.getData(`offers`).then((data) => {
  offersModel.offers = data;
});

const destinationModel = new DestinationModel();
const destinationPromise = server.getData(`destinations`).then((data) => {
  destinationModel.destinations = data;
});

server.getData(`points`).then((data) => console.log(data));

