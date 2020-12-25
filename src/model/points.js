export default class Points {
  set tripPoints(tripPoints) {
    this._tripPoints = tripPoints.slice();
  }

  get tripPoints() {
    return this._tripPoints;
  }

  updateTripPoint(newTripPoint) {
    const index = this._tripPoints.findIndex(({id}) => id === newTripPoint.id);
    this._tripPoints[index] = newTripPoint;
  }
}
