import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

import { CurrencyDropdownContainer } from "./CurrencyDropdown.styles";
import { Currency } from "../../types/Currency";

interface CurrencyMenuItemsProps {
  currency: Currency;
  exchangeRateNames: string[];
  id: string;
  label: string;
  setCurrencyValue: (originExchange: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyMenuItemsProps> = ({
  currency,
  exchangeRateNames,
  id,
  label,
  setCurrencyValue,
}) => (
  <CurrencyDropdownContainer variant="outlined">
    <InputLabel id={id}>{label}</InputLabel>
    <Select
      labelId={id}
      id={`${id}-select`}
      value={currency.currency}
      onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
        setCurrencyValue(event.target.value as string)
      }
      label={label}
    >
      {exchangeRateNames.map((name, index) => (
        <MenuItem value={name} key={index}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </CurrencyDropdownContainer>
);

export default CurrencyDropdown;
