import { CurrencySymbols } from "../types/Currency";
import {
  formatCurrency,
  formatResultValue,
  formatCurrencyExchangeRate,
} from "./currency-formatter";

describe("currency-formatter", () => {
  describe("formatCurrency", () => {
    describe("when converting an amount of euros", () => {
      it("should format the amount accordingly to the currency locale and add the currency symbol", () => {
        const moneyAmount = 1234.56;
        const currency = "EUR";
        expect(formatCurrency(moneyAmount, currency)).toEqual("1,234.56");
      });
    });
  });

  describe("formatOriginResultValue", () => {
    describe("when formatting the origin currency amount", () => {
      it("should format the Origin result value with the right currency format", () => {
        const formattedOriginResult = formatResultValue({
          amount: 1234,
          currency: "EUR",
          hasEquals: true,
          symbol: CurrencySymbols.EUR,
        });

        expect(formattedOriginResult).toEqual("€ 1,234.00 EUR =");
      });
    });

    describe("when formatting the destination currency amount", () => {
      it("should format the Origin result value with the right currency format", () => {
        const formattedDestinationResult = formatResultValue({
          amount: 1234,
          currency: "USD",
          symbol: CurrencySymbols.USD,
        });

        expect(formattedDestinationResult).toEqual("$ 1,234.00 USD");
      });
    });
  });

  describe("formatCurrencyExchange", () => {
    describe("when formatting the exchange rate", () => {
      it("should format the currency echange rate with the currency format", () => {
        const formattedCurrencyExchangeRate = formatCurrencyExchangeRate({
          rate: 0.8296689620841284,
          fromCurrency: "USD",
          toCurrency: "EUR",
        });

        expect(formattedCurrencyExchangeRate).toEqual("1 USD = 0.83 EUR");
      });
    });
  });
});
