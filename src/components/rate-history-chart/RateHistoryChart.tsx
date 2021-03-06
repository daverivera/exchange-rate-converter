import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";
import { useGetHistoricalRateData } from "../../hooks/useGetHistoricalRateData";
import { CurrencyConversion } from "../../types/CurrencyConversion";
import {
  RateHistoryChartStyled,
  ChartContainer,
} from "./RateHistoryChart.styles";

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

  return (
    <RateHistoryChartStyled id="exchange-rate-history-chart">
      <Grid container>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {currencyConversion.originExchange.currency} to{" "}
            {currencyConversion.destinationExchange.currency} chart
          </Typography>
        </Grid>
        <ChartContainer item xs={12}>
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
            <XAxis dataKey="formatDate" interval={30} width={200} />
            <YAxis
              hide
              allowDecimals
              domain={[
                historicalRateChartData.min,
                historicalRateChartData.max,
              ]}
            />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#8884d8" dot={false} />
          </LineChart>
        </ChartContainer>
      </Grid>
    </RateHistoryChartStyled>
  );
};

export default RateHistoryChart;
