import { renderHook } from "@testing-library/react-hooks";
import {act} from "react-dom/test-utils";
import { CurrencySymbols } from "../types/Currency";
import { DEFAULT_DESTINATION_CURRENCY, DEFAULT_ORIGIN_CURRENCY } from "../utils/constants";
import { useCurrency } from "./useCurrency";

describe("useCurrency", () => {
  describe("when setting a currency", () => {
    it("should set the currency symbol and the currency value", () => {
      const { result } = renderHook(() =>
        useCurrency(DEFAULT_ORIGIN_CURRENCY as CurrencySymbols)
      );

      expect(result.current[0]).toEqual({
        symbol: "€",
        currency: "EUR",
      });
      expect(result.current[1]).toBeDefined();
    });
  });

  describe("when updating a currency", () => {
    it("should set the new currency symbol and the currency value", async () => {
      const { result } = renderHook(() =>
        useCurrency(DEFAULT_ORIGIN_CURRENCY)
      );

      const setCurrency = result.current[1] as Function;
      act(() => setCurrency(DEFAULT_DESTINATION_CURRENCY as CurrencySymbols));
      const [currency] = result.current;

      expect(currency).toEqual({
        symbol: "$",
        currency: "USD",
      });
    });
  });
});
