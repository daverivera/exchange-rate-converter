import { calculateCurrencyExchange } from "./currency-exchange-calculator";

describe("currency-exchange-calculator", () => {
  describe("calculateCurrencyExchange", () => {
    describe("when calculating the conversion amount from Euros currency to US Dollars", () => {
      it("should return the amount converted to US Dollars", () => {
        const moneyAmount = 1234.56;
        const currencyExchangeRate = 1.2053;
        expect(calculateCurrencyExchange(moneyAmount, currencyExchangeRate)).toEqual(1488.015);
      });
    });
  });
});
