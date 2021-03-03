import React from "react";

import { CurrencyConversion } from "../../types/CurrencyConversion";
import { ConversionResultsContainer } from "./ConversionResult.styles";
import FormattedResultValues from "./FormattedResultValues";

interface ConversionResultProps {
  currencyConversion?: CurrencyConversion;
}

const ConversionResult: React.FC<ConversionResultProps> = ({
  currencyConversion,
}) => {
  if (!currencyConversion) {
    return null;
  }

  return (
    <ConversionResultsContainer>
      <FormattedResultValues currencyConversion={currencyConversion} />
    </ConversionResultsContainer>
  );
};

export default ConversionResult;
