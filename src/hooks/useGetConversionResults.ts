import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyConversion } from "../types/CurrencyConversion";
import { ExchangeRatesResponse } from "../types/Exchange";
import { API_RESOURCES } from "../utils/constants";

export const useGetConversionResults = (
  currencyConversion: CurrencyConversion
) => {
  const [originValue, setOriginvalue] = useState<string>();
  const [originToDestination, setOriginToDestination] = useState<string>();
  const [destinationValue, setDestinationValue] = useState<string>();
  const [destinationToOrigin, setDestinationToOrigin] = useState<string>();

  useEffect(() => {
    const getCurrencyExchangeRates = async () => {
      axios
        .get<ExchangeRatesResponse>(API_RESOURCES.allRates, {
          params: {
            base: currencyConversion?.originExchange,
            symbols: currencyConversion?.destinationExchange,
          },
        })
        .then((response) => {
          const conversion =
            parseInt(currencyConversion.amount) *
            response.data.rates[currencyConversion.destinationExchange];
          setOriginvalue(
            `€ ${currencyConversion?.amount} ${currencyConversion.originExchange} =`
          );
          setDestinationValue(
            `$ ${conversion} ${currencyConversion.destinationExchange}`
          );
          setOriginToDestination(
            `1 ${currencyConversion.originExchange} = ${
              response.data.rates[currencyConversion.destinationExchange]
            } ${currencyConversion.destinationExchange}`
          );
          setDestinationToOrigin(
            `1 ${currencyConversion.destinationExchange} = ${
              1 / response.data.rates[currencyConversion.destinationExchange]
            } ${currencyConversion.originExchange}`
          );
        });
    };

    if (currencyConversion) {
      getCurrencyExchangeRates();
    }
  }, [currencyConversion]);

  return {
    originValue,
    destinationValue,
    originToDestination,
    destinationToOrigin,
  };
};
