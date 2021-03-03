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
      axiosMock.onGet(API_RESOURCES.allRates, { base: "EUR", symbols: "USD" }).reply(200, {
        base: "EUR",
        date: "2021-03-01",
        rates: { USD: 1.2053 },
      });

      const currencyConversion: CurrencyConversion = {
        amount: 1234,
        destinationExchange: { symbol: CurrencySymbols.USD, currency: "USD" },
        originExchange: { symbol: CurrencySymbols.EUR, currency: "EUR" },
      };

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetConversionResults(currencyConversion)
      );
      await waitForNextUpdate();

      expect(result.current.originValue).toEqual("€ 1,234.00 EUR =");
      expect(result.current.destinationValue).toEqual("$ 1,487.34 USD");
      expect(result.current.originToDestination).toEqual("1 EUR = 1.21 USD");
      expect(result.current.destinationToOrigin).toEqual(
        "1 USD = 0.83 EUR"
      );
    });
  });
});
