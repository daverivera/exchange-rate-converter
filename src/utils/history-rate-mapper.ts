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
  const [year, month, day] = dateString.split("-");
  const date = new Date(`${month}/${day}/${year}`);

  return date.valueOf();
};

export const mapHistoryByCurrency = (rateHistory) => {
  return Object.entries(rateHistory).reduce(
    (formattedRateHistory, historyEntry) => {
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
          date,
          formatDate: formatDate(date),
          rate: exchangeRate,
        });
      });

      return formattedRateHistory;
    },
    {}
  );
};

export const orderByCurrencyDates = (
  mappedByCurrency: HistoricalChartData
): HistoricalChartData => {
  for (let key in mappedByCurrency) {
    const orderedList = mappedByCurrency[key].values.sort(
      (firstEl, secondEl) => {
        return convertToEpoch((firstEl.date as unknown) as string) -
          convertToEpoch((secondEl.date as unknown) as string)
      }
    );
    mappedByCurrency[key].values = orderedList;
  }

  return mappedByCurrency;
};

export const historyRateMapper = (
  rateHistory: HistoricalExchangeRateDate
): HistoricalChartData => {
  const mappedByCurrency = mapHistoryByCurrency(rateHistory);
  const historicalRateMapped = orderByCurrencyDates(mappedByCurrency);

  return historicalRateMapped;
};
