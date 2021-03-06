import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook } from "@testing-library/react-hooks";
import { API_RESOURCES } from "../utils/constants";
import { CurrencyConversion } from "../types/CurrencyConversion";
import { CurrencySymbols } from "../types/Currency";
import { useGetHistoricalRateData } from "./useGetHistoricalRateData";

const axiosMock = new MockAdapter(axios);
Date.now = jest.fn(() => 1831075200);

jest.mock("../utils/date", () => ({
  calculateThreeMonthsAgo: () => "2017-01-10",
  urlDateFormatter: jest.fn(),
}));
import * as DateUtil from "../utils/date";

describe("useGetHistoricalRateData", () => {
  describe("when fetching for the currency historical exchange rates", () => {
    it("should return the hitorical exchange rate by currency for the past year", async () => {
      axiosMock
        .onGet(API_RESOURCES.history, {
          base: "EUR",
          symbols: "USD",
          start_at: "2018-01-10",
          end_at: "2017-01-10",
        })
        .reply(200, {
          base: "USD",
          start_at: "2018-01-01",
          end_at: "2018-01-10",
          rates: {
            "2018-02-01": {
              EUR: 0.8380824673,
            },
            "2018-01-01": {
              EUR: 0.8317391666,
            },
            "2018-03-01": {
              EUR: 0.8352125616,
            },
          },
        });

      jest
        .spyOn(DateUtil, "urlDateFormatter")
        .mockReturnValueOnce("2018-01-10")
        .mockReturnValueOnce("2017-01-10");

      const currencyConversion: CurrencyConversion = {
        amount: 1234,
        destinationExchange: { symbol: CurrencySymbols.EUR, currency: "EUR" },
        originExchange: { symbol: CurrencySymbols.USD, currency: "USD" },
      };

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetHistoricalRateData(currencyConversion)
      );
      await waitForNextUpdate();

      expect(result.current).toEqual({
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
      });
    });
  });

  describe("when no currencyConversion is passed", () => {
    it("should return undefined", () => {
      const { result } = renderHook(() => useGetHistoricalRateData(undefined));

      expect(result.current).toEqual(undefined);
    });
  });
});
