import React, { useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { CircularProgress, Grid } from "@material-ui/core";

import CurrencyDropdown from "../currency-dropdown/CurrencyDropdown";
import BidirectionalButton from "../bidirectional-button/BidirectionalButton";
import { ExchangeContainer, ExchangeButton, Amount, CurrencyDropdownContainer } from "./Exchange.styles";
import { useGetAllEchangeRateNames } from "../../hooks/useGetAllExchangeRateNames";
import { CurrencyConversion } from "../../types/CurrencyConversion";
import { useCurrency } from "../../hooks/useCurrency";
import {
  DEFAULT_DESTINATION_CURRENCY,
  DEFAULT_ORIGIN_CURRENCY,
} from "../../utils/constants";

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
  };

  return (
    <ExchangeContainer variant="outlined">
      <Grid container spacing={3}>
        <Grid item sm={3} xs={12}>
          <Amount
            label="Amount"
            id="currency-amount"
            variant="outlined"
            value={amount}
            outputFormat="number"
            currencySymbol={originExchange.symbol}
            onChange={(_: any, value: number) => setAmount(value)}
          />
        </Grid>
        <CurrencyDropdownContainer item sm={3} xs={4}>
          <CurrencyDropdown
            currency={originExchange}
            exchangeRateNames={exchangeRateNames}
            id="from-currency-value-input"
            label="From"
            setCurrencyValue={setOriginExchange}
          />
        </CurrencyDropdownContainer>
        <Grid item sm={1} xs={4}>
          <BidirectionalButton onClick={swapExchangeCurrency} />
        </Grid>
        <CurrencyDropdownContainer item sm={3} xs={4}>
          <CurrencyDropdown
            currency={destinationExchange}
            exchangeRateNames={exchangeRateNames}
            id="to-currency-value-input"
            label="To"
            setCurrencyValue={setDestinationExchange}
          />
        </CurrencyDropdownContainer>
        <Grid item sm={1} xs={12}>
          <ExchangeButton
            color="primary"
            disableElevation
            disabled={!amount}
            fullWidth
            id="convert-currency-button"
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
