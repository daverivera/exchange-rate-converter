import { useState } from "react";
import { Currency, CurrencySymbols } from "../types/Currency";

export const useMultiCurrency = (
  currencyValue: string
  //): [Currency[], (updatedCurrencyValue: string[]) => void] => {
) => {
  const [selectedTargetCurrencies, setSelectedTargetCurrencies] = useState<
    string[]
  >([currencyValue]);
  const [targetCurrencies, setTargetCurrencies] = useState<Currency[]>([
    {
      symbol: CurrencySymbols[currencyValue as keyof typeof CurrencySymbols],
      currency: currencyValue,
    },
  ]);

  const updateTargetCurrencies = (updatedCurrencyValues: string[]) => {
    setSelectedTargetCurrencies(updatedCurrencyValues);
    const currencyList = updatedCurrencyValues.map((currencyValue) => ({
      currency: currencyValue,
      symbol: CurrencySymbols[currencyValue as keyof typeof CurrencySymbols],
    }));
    setTargetCurrencies(currencyList);
  };

  return { targetCurrencies, updateTargetCurrencies, selectedTargetCurrencies };
};
