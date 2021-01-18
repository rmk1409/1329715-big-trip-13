import {Points as PointsModel} from "../model/points";
import {isOnline} from "../util/common";

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};


const RequestType = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};

class Provider {
  constructor(server, store) {
    this._server = server;
    this._store = store;
  }

  getData(requestedData) {
    let resultPromise = null;
    if (isOnline()) {
      const promiseWithData = this._server.getData(requestedData);
      switch (requestedData) {
        case RequestType.POINTS:
          resultPromise = promiseWithData.then((points) => {
            this._store.setItems(RequestType.POINTS, points.map(PointsModel.adaptToServer));
            return points;
          });
          break;
        case RequestType.DESTINATIONS:
          resultPromise = promiseWithData.then((destinations) => {
            this._store.setItems(RequestType.DESTINATIONS, destinations);
            return destinations;
          });
          break;
        case RequestType.OFFERS:
          resultPromise = promiseWithData.then((offers) => {
            this._store.setItems(RequestType.OFFERS, offers);
            return offers;
          });
          break;
      }
    } else {
      const storeData = this._store.getItems(requestedData);

      switch (requestedData) {
        case RequestType.POINTS:
          resultPromise = Promise.resolve(storeData.map(PointsModel.adaptToClient));
          break;
        case RequestType.DESTINATIONS:
        case RequestType.OFFERS:
          resultPromise = Promise.resolve(storeData);
          break;
      }
    }

    return resultPromise;
  }

  updatePoint(updatedPoint) {
    let resultPromise;

    if (isOnline()) {
      resultPromise = this._server.updatePoint(updatedPoint)
        .then((updatedPointByServer) => {
          this._store.setItem(RequestType.POINTS, updatedPointByServer.id, updatedPointByServer);
          return updatedPointByServer;
        });
    } else {
      const adaptToServer = PointsModel.adaptToServer(updatedPoint);

      this._store.setItem(RequestType.POINTS, updatedPoint.id, adaptToServer);
      resultPromise = Promise.resolve(adaptToServer);
    }

    return resultPromise;
  }

  addPoint(point) {
    let resultPromise;

    if (isOnline()) {
      resultPromise = this._server.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(RequestType.POINTS, newPoint.id, newPoint, true);
          return newPoint;
        });
    } else {
      resultPromise = Promise.reject(new Error(`Add task failed`));
    }

    return resultPromise;
  }

  deletePoint(id) {
    let resultPromise;

    if (isOnline()) {
      resultPromise = this._server.deletePoint(id)
        .then(() => this._store.removeItem(RequestType.POINTS, id));
    } else {
      resultPromise = Promise.reject(new Error(`Delete task failed`));
    }

    return resultPromise;
  }

  sync() {
    let resultPromise;

    if (isOnline()) {
      const storePoints = this._store.getItems(RequestType.POINTS);

      resultPromise = this._server.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = [...createdPoints, ...updatedPoints];

          this._store.setItems(RequestType.POINTS, items);
        });
    } else {
      resultPromise = Promise.reject(new Error(`Sync data failed`));
    }

    return resultPromise;
  }
}

export {Provider};
