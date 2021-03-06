import Styled from "styled-components";
import { Paper } from "@material-ui/core";

export const RateHistoryChartStyled = Styled(Paper)`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  overflow: inherit;

  .recharts-surface {
    overflow: visible;
  }
`;
