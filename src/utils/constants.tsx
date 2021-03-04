export const API_URL = process.env.REACT_APP_EXCHANGE_RATES_API;

export const API_RESOURCES = {
  latestRates: `${API_URL}/latest`,
  historicalRates: `${API_URL}`,
};

export const DEFAULT_ORIGIN_CURRENCY = "EUR";
export const DEFAULT_DESTINATION_CURRENCY = "USD";
