import _ from "lodash";
import {
  HistoricalChartData,
  HistoricalExchangeRateDate,
} from "../types/HistoricalRates";

const formatDate = (date) =>
  new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const convertToEpoch = (dateString: string) => {
  const [year, day, month] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);

  return date.valueOf();
};

export const historyRateMapper = (
  rateHistory: HistoricalExchangeRateDate
): HistoricalChartData => {
  return _.sortBy(Object.entries(rateHistory), ([date]) =>
    convertToEpoch(date)
  ).reduce((formattedRateHistory, historyEntry) => {
    const [date, rateByCurrency] = historyEntry;

    Object.entries(rateByCurrency).forEach(([currency, exchangeRate]) => {
      if (!formattedRateHistory[currency]) {
        formattedRateHistory[currency] = {
          min: NaN,
          max: NaN,
          values: [],
        };
      }

      if (
        !formattedRateHistory[currency].min ||
        exchangeRate < formattedRateHistory[currency].min
      ) {
        formattedRateHistory[currency].min = exchangeRate;
      }

      if (
        !formattedRateHistory[currency].max ||
        exchangeRate > formattedRateHistory[currency].max
      ) {
        formattedRateHistory[currency].max = exchangeRate;
      }

      formattedRateHistory[currency].values.push({
        rate: exchangeRate,
        date: formatDate(date),
      });
    });

    return formattedRateHistory;
  }, {});
};
