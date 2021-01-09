import SmartView from "./smart-view";

const createStatsTemplate = () => {
  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
              Money
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
              Transport
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
              Time
            </div>
          </section>`;
};

class Stats extends SmartView {
  constructor(points) {
    super(points);
  }

  getTemplate() {
    return createStatsTemplate();
  }

  restoreHandlers() {
  }
}

export {Stats};
