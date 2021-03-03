import Styled from "styled-components";
import { Button, Paper, TextField } from "@material-ui/core";

export const ExchangeContainer = Styled(Paper)`
  padding: 2rem;
  width: 100%;
`;

export const Amount = Styled(TextField)`
  width: 100%;
`;

export const ExchangeButton = Styled(Button)`
  height: 100%;
`;
