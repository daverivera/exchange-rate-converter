import axios from "axios";
import { useEffect, useState } from "react";
import { ExchangeRatesResponse } from "../types/Exchange";
import { API_RESOURCES } from "../utils/constants";

export const useGetAllEchangeRateNames = () => {
  const [exchangeRateNames, setExchangeRateNames] = useState<string[]>();

  useEffect(() => {
    (async () => {
      axios
        .get<ExchangeRatesResponse>(API_RESOURCES.allRates)
        .then((response) => {
          const { base } = response.data;
          const exchangeRateNamesList = Object.keys(response.data.rates);
          setExchangeRateNames([...exchangeRateNamesList, base]);
        });
    })();
  }, []);

  return exchangeRateNames;
};
