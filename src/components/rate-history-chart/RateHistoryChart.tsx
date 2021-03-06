import React from "react";
import { LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";
import { useGetHistoricalRateData } from "../../hooks/useGetHistoricalRateData";
import { CurrencyConversion } from "../../types/CurrencyConversion";
import { RateHistoryChartStyled } from "./RateHistoryChart.styles";

interface RateHistoryChartProps {
  currencyConversion?: CurrencyConversion;
}

const RateHistoryChart: React.FC<RateHistoryChartProps> = ({
  currencyConversion,
}) => {
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
