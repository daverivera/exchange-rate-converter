import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyConversion } from "../types/CurrencyConversion";
import { HistoricalChartData, HistoricalRatesResponse } from "../types/HistoricalRates";
import { API_RESOURCES } from "../utils/constants";
import { calculateThreeMonthsAgo, urlDateFormatter } from "../utils/date";
import { historyRateMapper } from "../utils/history-rate-mapper";

export const useGetHistoricalRateData = (
  currencyConversion?: CurrencyConversion
) => {
  const [chartHistoricalRateData, setChartHistoricalRateData] = useState<HistoricalChartData>();

  useEffect(() => {
    const today = new Date();
    const threeMonthsPast = calculateThreeMonthsAgo(new Date());

    const getCurrencyRateHistory = async () => {
      await axios
        .get<HistoricalRatesResponse>(API_RESOURCES.history, {
          params: {
            base: currencyConversion?.originExchange.currency,
            end_at: urlDateFormatter(today),
            start_at: urlDateFormatter(threeMonthsPast),
            symbols: currencyConversion?.destinationExchange.currency,
          },
        })
        .then((response) => {
          setChartHistoricalRateData(historyRateMapper(response.data.rates));
        });
    };

    if (currencyConversion) {
      getCurrencyRateHistory();
    }
  }, [currencyConversion]);

  if (!currencyConversion || !chartHistoricalRateData) {
    return undefined;
  }

  return chartHistoricalRateData[currencyConversion.destinationExchange.currency];
};
