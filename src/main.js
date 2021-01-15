import {Trip as TripPresenter} from './presenter/trip';
import {Points as PointsModel} from "./model/points";
import {Filter as FilterPresenter} from "./presenter/filter";
import {Filter as FilterModel} from "./model/filter";
import {Stats as StatsView} from "./view/stats";
import {remove, render, RenderPosition} from "./util/render";
import {Menu as MenuView} from "./view/menu";
import {MenuItem} from "./util/const";
import {Server} from "./api/server";
import {Offers as OffersModel} from "./model/offers";
import {Destination as DestinationModel} from "./model/destination";

const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;
const AUTHORIZATION_KEY = `Basic tRCyBa6sgC)zar>`;

const pageBody = document.querySelector(`.page-main .page-body__container`);
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = pageBody.querySelector(`.trip-events`);

const filterHeader = tripMain.querySelector(`.trip-controls h2:nth-of-type(2)`);
const pointsModel = new PointsModel();

const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();

const server = new Server(END_POINT, AUTHORIZATION_KEY);

const tripPresenter = new TripPresenter(tripMain, tripEvents, pointsModel, filterModel, offersModel, destinationModel, server);
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
      statsView = new StatsView(pointsModel.points, offersModel);
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

const offersPromise = server.getData(`offers`);
const destinationPromise = server.getData(`destinations`);
const pointsPromise = server.getData(`points`);

Promise.all([offersPromise, destinationPromise, pointsPromise])
  .then(([offersData, destinationData, pointsData]) => {
    offersModel.offers = offersData;
    destinationModel.destinations = destinationData;
    pointsModel.points = pointsData;
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});
