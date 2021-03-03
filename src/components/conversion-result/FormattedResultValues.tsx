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
}

const FormattedResultValues: React.FC<FormattedResultValuesProps> = ({
  currencyConversion,
}) => {
  const {
    originValue,
    destinationValue,
    originToDestination,
    destinationToOrigin,
  } = useGetConversionResults(currencyConversion);

  return (
    <>
      <FromValue>{originValue}</FromValue>
      <ToValue>{destinationValue}</ToValue>

      <ExchangeRate>
        <span>{originToDestination}</span>

        <span>{destinationToOrigin}</span>
      </ExchangeRate>
    </>
  );
};

export default FormattedResultValues;
