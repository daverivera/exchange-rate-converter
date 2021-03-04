import React from "react";

import FormattedResultValues from "../formatted-result-values/FormattedResultValues";
import DateSelector from "../date-selector/DateSelector";
import { CurrencyConversion } from "../../types/CurrencyConversion";
import { ConversionResultsContainer } from "./ConversionResult.styles";

interface ConversionResultProps {
  currencyConversion?: CurrencyConversion;
  historicalRateDay: Date;
  setHistoricalRateDay: (historicalRateDay: Date) => void;
}

const ConversionResult: React.FC<ConversionResultProps> = ({
  currencyConversion,
  historicalRateDay,
  setHistoricalRateDay,
}) => {
  if (!currencyConversion) {
    return null;
  }

  return (
    <ConversionResultsContainer>
      <FormattedResultValues
        currencyConversion={currencyConversion}
        historicalRateDay={historicalRateDay}
      />
      <DateSelector
        historicalRateDay={historicalRateDay}
        setHistoricalRateDay={setHistoricalRateDay}
      />
    </ConversionResultsContainer>
  );
};

export default ConversionResult;
