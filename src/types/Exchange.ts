//export type Exchange = Record<string, number>;
export type Exchange = Record<string, number>;

export interface ExchangeRatesResponse {
  rates: Exchange;
  base: string;
  date: string;
}
