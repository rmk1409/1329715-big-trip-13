import {Points as PointsModel} from "./model/points";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
};

class Server {
  constructor(endPoint, authorizationKey) {
    this._endPoint = endPoint;
    this._authorizationKey = authorizationKey;
  }

  getData(requestedData) {
    let promise = this._sendRequest({url: `${requestedData}`});
    switch (requestedData) {
      case `points`:
        promise = promise.then((points) => points.map(PointsModel.adaptToClient));
        break;
    }
    return promise;
  }

  updatePoint(updatedPoint) {
    return this._sendRequest({
      url: `points/${updatedPoint.id}`,
      method: Method.PUT,
      // TODO Add adapt to Server
      body: JSON.stringify(updatedPoint),
      // TODO try to update without content-type header.
      headers: new Headers({"Content-Type": `application/json`}),
    });
  }

  _checkStatus(resp) {
    if (!resp.ok) {
      throw new Error(`${resp.status}: ${resp.statusText}`);
    }

    return resp;
  }

  _onRejected(err) {
    throw err;
  }

  _sendRequest(requestData) {
    const {url = ``, method = Method.GET, body = null, headers = new Headers()} = requestData;
    headers.append(`Authorization`, this._authorizationKey);

    const fullUrl = `${this._endPoint}/${url}`;

    return fetch(fullUrl, {method, body, headers})
      .then(this._checkStatus)
      .then((resp) => resp.json())
      .catch(this._onRejected);
  }
}

export {Server};
