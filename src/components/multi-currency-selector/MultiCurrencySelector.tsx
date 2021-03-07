import React from "react";
import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import {Currency} from "../../types/Currency";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

interface MultiCurrencySelectorProps {
  currency: Currency;
  exchangeRateNames: string[];
  //id: string;
  //label: string;
  //setCurrencyValue: (originExchange: string) => void;
}

const MultiCurrencySelector: React.FC<MultiCurrencySelectorProps> = ({
  exchangeRateNames,
  currency,
}) => {
  const [currencies, setCurrencies] = React.useState<string[]>([currency.currency]);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrencies(event.target.value as string[]);
  };

  return (
    <FormControl variant="outlined" style={{ minWidth: 120, maxWidth: "100%" }}>
      <InputLabel id="multi-currency-selector">To</InputLabel>
      <Select
        label="To"
        labelId="demo-mutiple-checkbox-label"
        id="multi-currency-selector-checkbox"
        multiple
        value={currencies}
        onChange={handleChange}
        renderValue={(selected) => (selected as string[]).join(", ")}
      >
        {exchangeRateNames.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={currencies.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiCurrencySelector;
