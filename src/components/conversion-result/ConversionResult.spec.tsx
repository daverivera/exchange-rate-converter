import React from "react";
import { shallow } from "../../test/enzyme";
import { CurrencyConversion } from "../../types/CurrencyConversion";
import DateSelector from "../date-selector/DateSelector";
import FormattedResultValues from "../formatted-result-values/FormattedResultValues";
import ConversionResult from "./ConversionResult";

describe("ConversionResult", () => {
  describe("when there's a currency selected and amount entered", () => {
    it("should render the component correctly", () => {
      const historicalRateDay = new Date("10-20-2018");
      const setHistoricalRateDay = jest.fn();
      const currencyConversion = {
        amount: 123,
        destinationExchange: {
          currency: "EUR",
          symbol: "€",
        },
        originExchange: {
          currency: "USD",
          symbol: "$",
        },
      } as CurrencyConversion;

      const component = shallow(
        <ConversionResult
          currencyConversion={currencyConversion}
          historicalRateDay={historicalRateDay}
          setHistoricalRateDay={setHistoricalRateDay}
        />
      );

      expect(component.find(FormattedResultValues).exists()).toBe(true);
      expect(component.find(FormattedResultValues).props()).toEqual({
        currencyConversion,
        historicalRateDay,
      });
      expect(component.find(DateSelector).exists()).toBe(true);
      expect(component.find(DateSelector).props()).toEqual({
        historicalRateDay,
        setHistoricalRateDay,
      });
    });
  });

  describe("when there is not a currency selected and amount entered", () => {
    it("should not render anything", () => {
      const component = shallow(
        <ConversionResult
          currencyConversion={undefined}
          historicalRateDay={new Date()}
          setHistoricalRateDay={() => {}}
        />
      );

      expect(component.type()).toEqual(null);
    });
  });
});
