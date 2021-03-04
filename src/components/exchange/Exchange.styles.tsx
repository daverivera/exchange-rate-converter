import Styled from "styled-components";
import { Button, Paper } from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

export const ExchangeContainer = Styled(Paper)`
  padding: 2rem 1rem;
  width: 100%;
`;

export const Amount = Styled(CurrencyTextField)`
  width: 100%;
`;

export const ExchangeButton = Styled(Button)`
  height: 100%;
`;
