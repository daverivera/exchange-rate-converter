import { useState } from "react";
import { Currency, CurrencySymbols } from "../types/Currency";

export const useCurrency = (currencyValue: string): [Currency, (updatedCurrencyValue: string) => void] => {
  const [currency, setCurrency] = useState<Currency>({
    symbol: CurrencySymbols[currencyValue as keyof typeof CurrencySymbols],
    currency: currencyValue,
  });

  const updateCurrency = (updatedCurrencyValue: string) => setCurrency({
    currency: updatedCurrencyValue,
    symbol: CurrencySymbols[updatedCurrencyValue as keyof typeof CurrencySymbols],
  });

  return [currency, updateCurrency];
};
