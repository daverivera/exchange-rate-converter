export type Exchange = Record<string, number>;

export type ExchangeDate = Record<string, Exchange>;

export interface ExchangeRatesResponse {
  base: string;
  date: string;
  rates: Exchange;
}
