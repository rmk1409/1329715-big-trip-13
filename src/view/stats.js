import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TYPES} from "../mock/point";
import AbstractView from "./abstract-view";

const createStatsTemplate = () => {
  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};

const BAR_HEIGHT = 55;

const getTypeMoneyMap = (points) => {
  const result = new Map();

  TYPES.forEach((type) => {
    const money = Object.values(points).reduce((accumulator, currentPoint) => {
      let accumulatorResult = accumulator;
      if (currentPoint.type === type) {
        accumulatorResult += currentPoint.price;
      }
      return accumulatorResult;
    }, 0);

    if (money > 0) {
      result.set(type.toUpperCase(), money);
    }
  });

  return result;
};

const getTypeTimesMap = (points) => {
  const result = new Map();

  TYPES.forEach((type) => {
    const times = Object.values(points).reduce((accumulator, currentPoint) => {
      let accumulatorResult = accumulator;
      if (currentPoint.type === type) {
        accumulatorResult++;
      }
      return accumulatorResult;
    }, 0);

    if (times > 0) {
      result.set(type.toUpperCase(), times);
    }
  });

  return result;
};

const MIN_IN_DAY = 24 * 60;

const getTypeDaysMap = (points) => {
  const result = new Map();

  TYPES.forEach((type) => {
    const minutes = Object.values(points).reduce((accumulator, currentPoint) => {
      let accumulatorResult = accumulator;
      if (currentPoint.type === type) {
        accumulatorResult += (currentPoint.endDate.diff(currentPoint.startDate, `minute`));
      }
      return accumulatorResult;
    }, 0);

    const days = (minutes / MIN_IN_DAY).toFixed();
    if (days > 0) {
      result.set(type.toUpperCase(), days);
    }
  });

  return result;
};

const renderMoneyChart = (canvas, points) => {
  const typeMoney = getTypeMoneyMap(points);
  const data = Array.from(typeMoney.keys());
  const values = Array.from(typeMoney.values());

  canvas.height = BAR_HEIGHT * data.length;

  return new Chart(canvas, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data,
      datasets: [{
        data: values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTransportChart = (canvas, points) => {
  const typeMoney = getTypeTimesMap(points);
  const data = Array.from(typeMoney.keys());
  const values = Array.from(typeMoney.values());

  canvas.height = BAR_HEIGHT * data.length;

  return new Chart(canvas, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data,
      datasets: [{
        data: values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (canvas, points) => {
  const typeMoney = getTypeDaysMap(points);
  const data = Array.from(typeMoney.keys());
  const values = Array.from(typeMoney.values());

  canvas.height = BAR_HEIGHT * data.length;

  return new Chart(canvas, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data,
      datasets: [{
        data: values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`,
        },
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

class Stats extends AbstractView {
  constructor(points) {
    super();

    this._points = points.slice();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  _setCharts() {
    const moneyCanvas = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCanvas = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCanvas = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCanvas, this._points);
    this._transportChart = renderTransportChart(transportCanvas, this._points);
    this._timeChart = renderTimeChart(timeCanvas, this._points);
  }
}

export {Stats};
