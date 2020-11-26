const createTripCostTemplate = (points) => {
  const total = points.reduce((acc, curVal) => acc + curVal.price, 0);

  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
          </p>`;
};

export {createTripCostTemplate};
