class Destination {
  set destinations(offers) {
    this._destinationInfo = new Map();
    offers.forEach((destinationInfoObject) => this._destinationInfo.set(destinationInfoObject.name, {
      description: destinationInfoObject.description,
      pictures: destinationInfoObject.pictures,
    }));
  }

  get destinations() {
    return this._destinationInfo;
  }

  getDestinationInfo(destination) {
    return this._destinationInfo.get(destination) || {};
  }
}

export {Destination};
