export const calculateCurrencyExchange = (
  moneyAmount: number,
  currencyExchangeRate: number
) => {
  const convertedAmount = moneyAmount * currencyExchangeRate;
  return Math.round(convertedAmount * 1000) / 1000;
};
