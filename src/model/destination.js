class Destination {
  set destinations(offers) {
    this._destinationInfo = new Map();
    offers.forEach((destinationInfoObject) => this._destinationInfo.set(destinationInfoObject.name, {
      description: destinationInfoObject.description,
      pictures: destinationInfoObject.pictures,
    }));
  }

  getDestinationInfo(destination) {
    return this._destinationInfo.get(destination) || [];
  }
}

export {Destination};
