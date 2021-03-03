import { CurrencySymbols } from "../types/Currency";

export const formatCurrency = (moneyAmount: number, currency: string) =>
  moneyAmount.toLocaleString(currency, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

interface FormatResultValue {
  amount: number;
  currency: string;
  hasEquals?: boolean;
  symbol: CurrencySymbols;
}

export const formatResultValue = ({
  amount,
  currency,
  hasEquals,
  symbol,
}: FormatResultValue) =>
  `${symbol} ${formatCurrency(amount, currency)} ${currency}${
    hasEquals ? " =" : ""
  }`;

interface FormatCurrencyExchangeRate {
  rate: number;
  fromCurrency: string;
  toCurrency: string;
}

export const formatCurrencyExchangeRate = ({
  rate,
  fromCurrency,
  toCurrency,
}: FormatCurrencyExchangeRate) =>
  `1 ${fromCurrency} = ${formatCurrency(rate, toCurrency)} ${toCurrency}`;
