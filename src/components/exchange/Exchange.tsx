import React, { useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { CircularProgress, Grid } from "@material-ui/core";

import CurrencyDropdown from "./CurrencyDropdown";
import { useGetAllEchangeRateNames } from "../../hooks/useGetAllExchangeRateNames";
import { ExchangeContainer, ExchangeButton, Amount } from "./Exchange.styles";
import {
  DEFAULT_DESTINATION_CURRENCY,
  DEFAULT_ORIGIN_CURRENCY,
} from "../../utils/constants";
import { CurrencyConversion } from "../../types/CurrencyConversion";

interface ExchangeProps {
  setCurrencyConversion: (currencyConversion: CurrencyConversion) => void;
}

const Exchange: React.FC<ExchangeProps> = ({ setCurrencyConversion }) => {
  const [amount, setAmount] = useState<string>("");
  const [originExchange, setOriginExchange] = useState<string>(
    DEFAULT_ORIGIN_CURRENCY
  );
  const [destinationExchange, setDestinationExchange] = useState<string>(
    DEFAULT_DESTINATION_CURRENCY
  );
  const exchangeRateNames = useGetAllEchangeRateNames();

  if (!exchangeRateNames) {
    return <CircularProgress />;
  }

  const handleConversion = () => {
    setCurrencyConversion({
      amount,
      destinationExchange,
      originExchange,
    });
  };

  return (
    <ExchangeContainer variant="outlined">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Amount
            id="outlined-basic"
            label="Amount"
            value={amount}
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(event.target.value)
            }
          />
        </Grid>
        <Grid item xs={3}>
          <CurrencyDropdown
            currencyValue={originExchange}
            exchangeRateNames={exchangeRateNames}
            id="from-currency-value-input"
            label="From"
            setCurrencyValue={setOriginExchange}
          />
        </Grid>
        <Grid item xs={3}>
          <CurrencyDropdown
            currencyValue={destinationExchange}
            exchangeRateNames={exchangeRateNames}
            id="to-currency-value-input"
            label="To"
            setCurrencyValue={setDestinationExchange}
          />
        </Grid>
        <Grid item xs={1}>
          <ExchangeButton
            disabled={!amount}
            color="primary"
            onClick={handleConversion}
            startIcon={<ArrowForwardIosIcon />}
            variant="contained"
          />
        </Grid>
      </Grid>
    </ExchangeContainer>
  );
};

export default Exchange;
