import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyConversion } from "../types/CurrencyConversion";
import { ExchangeRatesResponse } from "../types/Exchange";
import { API_RESOURCES } from "../utils/constants";
import { calculateCurrencyExchange } from "../utils/currency-exchange-calculator";
import {
  formatCurrencyExchangeRate,
  formatResultValue,
} from "../utils/currency-formatter";
import { urlDateFormatter } from "../utils/date";

const getApiResource = (historicalRateDay: Date) => {
  const today = new Date();
  const isToday =
    historicalRateDay.getDate() === today.getDate() &&
    historicalRateDay.getMonth() === today.getMonth() &&
    historicalRateDay.getFullYear() === today.getFullYear();

  return isToday
    ? API_RESOURCES.latestRates
    : `${API_RESOURCES.historicalRates}/${urlDateFormatter(historicalRateDay)}`;
};

export const useGetConversionResults = (
  currencyConversion: CurrencyConversion,
  historicalRateDay: Date
) => {
  const [originValue, setOriginvalue] = useState<string>();
  const [originToDestination, setOriginToDestination] = useState<string>();
  const [destinationValue, setDestinationValue] = useState<string>();
  const [destinationToOrigin, setDestinationToOrigin] = useState<string>();

  useEffect(() => {
    const { amount, destinationExchange, originExchange } = currencyConversion;
    const apiResource = getApiResource(historicalRateDay);
    const getCurrencyExchangeRates = async () => {
      axios
        .get<ExchangeRatesResponse>(apiResource, {
          params: {
            base: originExchange.currency,
            symbols: destinationExchange.currency,
          },
        })
        .then((response) => {
          const conversion = calculateCurrencyExchange(
            amount,
            response.data.rates[destinationExchange.currency]
          );
          setOriginvalue(
            formatResultValue({
              amount,
              currency: originExchange.currency,
              hasEquals: true,
              symbol: originExchange.symbol,
            })
          );
          setDestinationValue(
            formatResultValue({
              amount: conversion,
              currency: destinationExchange.currency,
              symbol: destinationExchange.symbol,
            })
          );
          setOriginToDestination(
            formatCurrencyExchangeRate({
              rate: response.data.rates[destinationExchange.currency],
              fromCurrency: originExchange.currency,
              toCurrency: destinationExchange.currency,
            })
          );
          setDestinationToOrigin(
            formatCurrencyExchangeRate({
              rate: 1 / response.data.rates[destinationExchange.currency],
              fromCurrency: destinationExchange.currency,
              toCurrency: originExchange.currency,
            })
          );
        });
    };

    getCurrencyExchangeRates();
  }, [currencyConversion, historicalRateDay]);

  return {
    originValue,
    destinationValue,
    originToDestination,
    destinationToOrigin,
  };
};
