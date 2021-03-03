export const API_URL = process.env.REACT_APP_EXCHANGE_RATES_API;

export const API_RESOURCES = {
  allRates: `${API_URL}/latest`,
};

export const DEFAULT_ORIGIN_CURRENCY = "EUR";
export const DEFAULT_DESTINATION_CURRENCY = "USD";
