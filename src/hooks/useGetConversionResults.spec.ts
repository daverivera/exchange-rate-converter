import { renderHook } from "@testing-library/react-hooks";
import { useGetConversionResults } from "./useGetConversionResults";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { API_RESOURCES } from "../utils/constants";
import { CurrencyConversion } from "../types/CurrencyConversion";
import { CurrencySymbols } from "../types/Currency";

const axiosMock = new MockAdapter(axios);

describe("useGetConversionResults", () => {
  describe("when passing the conversion parameters", () => {
    it("should convert the value using the right exchange rate", async () => {
      axiosMock
        .onGet(API_RESOURCES.latestRates, { base: "EUR", symbols: "USD" })
        .reply(200, {
          base: "EUR",
          date: "2021-03-01",
          rates: { USD: 1.2053 },
        });

      const currencyConversion: CurrencyConversion = {
        amount: 1234,
        destinationExchange: { symbol: CurrencySymbols.USD, currency: "USD" },
        originExchange: { symbol: CurrencySymbols.EUR, currency: "EUR" },
      };
      const historicalRateDay = new Date();

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetConversionResults(currencyConversion, historicalRateDay)
      );
      await waitForNextUpdate();

      expect(result.current.originValue).toEqual("€ 1,234.00 EUR =");
      expect(result.current.destinationValue).toEqual("$ 1,487.34 USD");
      expect(result.current.originToDestination).toEqual("1 EUR = 1.21 USD");
      expect(result.current.destinationToOrigin).toEqual("1 USD = 0.83 EUR");
    });
  });

  describe("when requesting the conversion rates of an specific date", () => {
    it("should convert the value using the right exchange rate", async () => {
      axiosMock
        .onGet(`${API_RESOURCES.historicalRates}/2010-01-12`, { base: "EUR", symbols: "USD" })
        .reply(200, {
          base: "EUR",
          date: "2010-01-12",
          rates: { USD: 1.4481 },
        });

      const currencyConversion: CurrencyConversion = {
        amount: 1234,
        destinationExchange: { symbol: CurrencySymbols.USD, currency: "USD" },
        originExchange: { symbol: CurrencySymbols.EUR, currency: "EUR" },
      };
      const pastHistoricalRateDay = new Date("2010-01-12");

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetConversionResults(currencyConversion, pastHistoricalRateDay)
      );
      await waitForNextUpdate();

      expect(result.current.originValue).toEqual("€ 1,234.00 EUR =");
      expect(result.current.destinationValue).toEqual("$ 1,786.96 USD");
      expect(result.current.originToDestination).toEqual("1 EUR = 1.45 USD");
      expect(result.current.destinationToOrigin).toEqual("1 USD = 0.69 EUR");
    });
  });
});
