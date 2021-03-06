import { Exchange } from "./Exchange";

export type HistoricalExchangeRateDate = Record<string, Exchange>;

export interface HistoricalRatesResponse {
  base: string;
  date: string;
  end_at: string;
  rates: HistoricalExchangeRateDate;
  start_at: string;
}

export interface HistoricalChartItem  {
  date: string;
  rate: number;
  formattedDate: string;
}

export interface HistoricalCurrencyExchangeRates {
  min: number;
  max: number;
  values: Record<string, HistoricalChartItem>[]
}

export type HistoricalChartData = Record<string, HistoricalCurrencyExchangeRates>
