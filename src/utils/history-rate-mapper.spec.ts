import { ExchangeDate } from "../types/Exchange";
import {HistoricalChartData} from "../types/HistoricalRates";
import {
  mapHistoryByCurrency,
  orderByCurrencyDates,
} from "./history-rate-mapper";

describe("history-rate-mapper", () => {
  describe("mapHistoryByCurrency", () => {
    describe("when formatting a history rate", () => {
      it("should format it as a '[date]: rate' object", () => {
        const rateHistory = {
          "2021-02-15": { USD: 1.2129 },
          "2021-02-16": { USD: 1.2143 },
          "2021-02-17": { USD: 1.206 },
          "2021-02-18": { USD: 1.2084 },
          "2021-02-19": { USD: 1.2139 },
          "2021-02-22": { USD: 1.2133 },
          "2021-02-23": { USD: 1.2143 },
          "2021-02-24": { USD: 1.2146 },
          "2021-02-25": { USD: 1.2225 },
          "2021-02-26": { USD: 1.2121 },
          "2021-03-01": { USD: 1.2053 },
          "2021-03-02": { USD: 1.2028 },
          "2021-03-03": { USD: 1.2048 },
          "2021-03-04": { USD: 1.2034 },
          "2021-03-05": { USD: 1.1938 },
        } as ExchangeDate;

        const formattedRateHistory = mapHistoryByCurrency(rateHistory);

        expect(formattedRateHistory["USD"].values).toHaveLength(15);
        expect(formattedRateHistory).toEqual({
          USD: {
            max: 1.2225,
            min: 1.1938,
            values: [
              { date: "2021-02-15", rate: 1.2129, formatDate: "Feb 2021"},
              { date: "2021-02-16", rate: 1.2143, formatDate: "Feb 2021"},
              { date: "2021-02-17", rate: 1.206, formatDate: "Feb 2021"},
              { date: "2021-02-18", rate: 1.2084, formatDate: "Feb 2021"},
              { date: "2021-02-19", rate: 1.2139, formatDate: "Feb 2021"},
              { date: "2021-02-22", rate: 1.2133, formatDate: "Feb 2021"},
              { date: "2021-02-23", rate: 1.2143, formatDate: "Feb 2021"},
              { date: "2021-02-24", rate: 1.2146, formatDate: "Feb 2021"},
              { date: "2021-02-25", rate: 1.2225, formatDate: "Feb 2021"},
              { date: "2021-02-26", rate: 1.2121, formatDate: "Feb 2021"},
              { date: "2021-03-01", rate: 1.2053, formatDate: "Mar 2021"},
              { date: "2021-03-02", rate: 1.2028, formatDate: "Mar 2021"},
              { date: "2021-03-03", rate: 1.2048, formatDate: "Mar 2021"},
              { date: "2021-03-04", rate: 1.2034, formatDate: "Mar 2021"},
              { date: "2021-03-05", rate: 1.1938, formatDate: "Mar 2021"},
            ],
          },
        });
      });
    });
  });

  describe("orderByCurrencyDates", () => {
    describe("when formatting a history rate", () => {
      it("should return the ordered exchange rate list", () => {
        const mappedByCurrency = {
          EUR: {
            min: 0.8317391666,
            max: 0.8380824673,
            values: [
              {
                date: "2018-01-01",
                formatDate: "Jan 2018",
                rate: 0.8317391666,
              },
              {
                date: "2018-03-01",
                formatDate: "Mar 2018",
                rate: 0.8352125616,
              },
              {
                date: "2018-02-01",
                formatDate: "Feb 2018",
                rate: 0.8380824673,
              },
            ],
          },
        };

        const orderedCurrencies = orderByCurrencyDates(mappedByCurrency);
        expect(orderedCurrencies).toEqual({
          EUR: {
            min: 0.8317391666,
            max: 0.8380824673,
            values: [
              {
                date: "2018-01-01",
                formatDate: "Jan 2018",
                rate: 0.8317391666,
              },
              {
                date: "2018-02-01",
                formatDate: "Feb 2018",
                rate: 0.8380824673,
              },
              {
                date: "2018-03-01",
                formatDate: "Mar 2018",
                rate: 0.8352125616,
              },
            ],
          },
        });
      });
    });
  });
});
