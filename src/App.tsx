import React, { useState } from "react";
import { Container, CssBaseline } from "@material-ui/core";

import Exchange from "./components/exchange/Exchange";
import Header from "./components/header/Header";
import ConversionResult from "./components/conversion-result/ConversionResult";
import { CurrencyConversion } from "./types/CurrencyConversion";

function App() {
  const [currencyConversion, setCurrencyConversion] = useState<
    CurrencyConversion
  >();
  const [historicalRateDay, setHistoricalRateDay] = useState<Date>(new Date());
  const handleChangeHistoricalRateDay = (date: Date) =>
    setHistoricalRateDay(date);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Header />
        <Exchange
          setCurrencyConversion={setCurrencyConversion}
        />
        <ConversionResult
          currencyConversion={currencyConversion}
          historicalRateDay={historicalRateDay}
          setHistoricalRateDay={handleChangeHistoricalRateDay}
        />
      </Container>
    </>
  );
}

export default App;
