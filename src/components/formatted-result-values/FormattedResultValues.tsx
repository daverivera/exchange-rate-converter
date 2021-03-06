import React from "react";

import { useGetConversionResults } from "../../hooks/useGetConversionResults";
import { CurrencyConversion } from "../../types/CurrencyConversion";
import {
  ExchangeRate,
  FromValue,
  ToValue,
} from "./FormattedResultValues.styles";

interface FormattedResultValuesProps {
  currencyConversion: CurrencyConversion;
  historicalRateDay: Date;
}

const FormattedResultValues: React.FC<FormattedResultValuesProps> = ({
  currencyConversion,
  historicalRateDay
}) => {
  const {
    originValue,
    destinationValue,
    originToDestination,
    destinationToOrigin,
  } = useGetConversionResults(currencyConversion, historicalRateDay);

  return (
    <>
      <FromValue id="conversion-result-from-value">{originValue}</FromValue>
      <ToValue id="conversion-result-to-value">{destinationValue}</ToValue>

      <ExchangeRate>
        <span id="conversion-result-conversion-to-destionation">{originToDestination}</span>

        <span id="conversion-result-conversion-to-origin">{destinationToOrigin}</span>
      </ExchangeRate>
    </>
  );
};

export default FormattedResultValues;
