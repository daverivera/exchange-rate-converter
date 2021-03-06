import React from "react";
import { LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";
import { useGetHistoricalRateData } from "../../hooks/useGetHistoricalRateData";
import { CurrencyConversion } from "../../types/CurrencyConversion";
import { HistoricalChartItem } from "../../types/HistoricalRates";
import { historyRateMapper } from "../../utils/history-rate-mapper";
import { RateHistoryChartStyled } from "./RateHistoryChart.styles";

interface RateHistoryChartProps {
  currencyConversion?: CurrencyConversion;
}

const data = {
  "2018-01-09": {
    EUR: 0.8380824673,
  },
  "2018-01-03": {
    EUR: 0.8317391666,
  },
  "2018-01-08": {
    EUR: 0.8352125616,
  },
  "2018-01-10": {
    EUR: 0.8338892595,
  },
  "2018-01-05": {
    EUR: 0.8302200083,
  },
  "2018-01-02": {
    EUR: 0.828843763,
  },
  "2018-01-04": {
    EUR: 0.828843763,
  },
};
//const data = [
//{ date: "2018-01-09", exchangeRate: 0.8380824673 },
//{ date: "2018-01-03", exchangeRate: 0.8317391666 },
//{ date: "2018-01-08", exchangeRate: 0.8352125616 },
//{ date: "2018-01-10", exchangeRate: 0.8338892595 },
//{ date: "2018-01-05", exchangeRate: 0.8302200083 },
//{ date: "2018-01-02", exchangeRate: 0.828843763 },
//{ date: "2018-01-04", exchangeRate: 0.828843763 },
//];

const RateHistoryChart: React.FC<RateHistoryChartProps> = ({
  currencyConversion,
}) => {
  //const { EUR: chartData } = historyRateMapper(data) as { EUR: [] };
  const historicalRateChartData = useGetHistoricalRateData(currencyConversion);

  if (!historicalRateChartData) {
    return null;
  }

  console.log(historicalRateChartData.values)

  return (
    <RateHistoryChartStyled>
      <LineChart
        width={500}
        height={300}
        data={historicalRateChartData.values}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" interval={60} width={200} />
        <YAxis
          hide
          allowDecimals
          domain={[historicalRateChartData.min, historicalRateChartData.max]}
        />
        <Tooltip />
        <Line type="monotone" dataKey="rate" stroke="#8884d8" dot={false} />
      </LineChart>
    </RateHistoryChartStyled>
  );
};

export default RateHistoryChart;
