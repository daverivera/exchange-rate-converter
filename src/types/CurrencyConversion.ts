import { Currency } from "./Currency";

export interface CurrencyConversion {
  amount: number;
  destinationExchange: Currency;
  originExchange: Currency;
}
