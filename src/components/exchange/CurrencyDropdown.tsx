import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

import { CurrencyDropdownContainer } from "./CurrencyDropdown.styles";

interface CurrencyMenuItemsProps {
  currencyValue: string;
  exchangeRateNames: string[];
  id: string;
  label: string;
  setCurrencyValue: (originExchange: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyMenuItemsProps> = ({
  currencyValue,
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
      value={currencyValue}
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
