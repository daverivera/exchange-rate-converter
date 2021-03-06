import Styled from "styled-components";
import { Grid, Paper } from "@material-ui/core";

export const RateHistoryChartStyled = Styled(Paper)`
  margin-top: 2rem;
  padding-top: 1rem;

  .recharts-surface {
    overflow: visible;
  }
`;

export const ChartContainer = Styled(Grid)`
  display: flex;
  justify-content: center;
  overflow: inherit;
`;
