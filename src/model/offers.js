class Offers {
  set offers(offers) {
    this._typeOffer = new Map();
    offers.forEach((offerTypeObject) => this._typeOffer.set(offerTypeObject.type, offerTypeObject.offers));
  }

  getOffersForPointType(pointType) {
    return this._typeOffer.get(pointType) || [];
  }
}

export {Offers};
