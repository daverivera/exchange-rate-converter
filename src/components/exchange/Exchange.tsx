import React, { useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { CircularProgress, Grid } from "@material-ui/core";

import CurrencyDropdown from "./CurrencyDropdown";
import { useGetAllEchangeRateNames } from "../../hooks/useGetAllExchangeRateNames";
import { ExchangeContainer, ExchangeButton, Amount } from "./Exchange.styles";
import { CurrencyConversion } from "../../types/CurrencyConversion";
import { useCurrency } from "../../hooks/useCurrency";
import {
  DEFAULT_DESTINATION_CURRENCY,
  DEFAULT_ORIGIN_CURRENCY,
} from "../../utils/constants";
import BidirectionalButton from "./BidirectionalButton";

interface ExchangeProps {
  setCurrencyConversion: (currencyConversion: CurrencyConversion) => void;
}

const Exchange: React.FC<ExchangeProps> = ({ setCurrencyConversion }) => {
  const [amount, setAmount] = useState<number>();
  const [originExchange, setOriginExchange] = useCurrency(
    DEFAULT_ORIGIN_CURRENCY
  );
  const [destinationExchange, setDestinationExchange] = useCurrency(
    DEFAULT_DESTINATION_CURRENCY
  );
  const exchangeRateNames = useGetAllEchangeRateNames();

  if (!exchangeRateNames) {
    return <CircularProgress />;
  }

  const handleConversion = () => {
    if (amount) {
      setCurrencyConversion({
        amount,
        destinationExchange,
        originExchange,
      });
    }
  };

  const swapExchangeCurrency = () => {
    const newDestinationCurrency = originExchange.currency;
    setOriginExchange(destinationExchange.currency);
    setDestinationExchange(newDestinationCurrency);
  }

  return (
    <ExchangeContainer variant="outlined">
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Amount
            label="Amount"
            variant="outlined"
            value={amount}
            outputFormat="number"
            currencySymbol={originExchange.symbol}
            onChange={(_: any, value: number) => setAmount(value)}
          />
        </Grid>
        <Grid item xs={3}>
          <CurrencyDropdown
            currency={originExchange}
            exchangeRateNames={exchangeRateNames}
            id="from-currency-value-input"
            label="From"
            setCurrencyValue={setOriginExchange}
          />
        </Grid>
        <Grid item xs={1}>
          <BidirectionalButton
            onClick={swapExchangeCurrency}
          />
        </Grid>
        <Grid item xs={3}>
          <CurrencyDropdown
            currency={destinationExchange}
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
