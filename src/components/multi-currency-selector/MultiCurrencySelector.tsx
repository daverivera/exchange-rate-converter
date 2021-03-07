import React from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";

interface MultiCurrencySelectorProps {
  selectedTargetCurrencies: string[];
  exchangeRateNames: string[];
  //id: string;
  //label: string;
  updateTargetCurrencies: (selectedTargetCurrencies: string[]) => void;
}

const MultiCurrencySelector: React.FC<MultiCurrencySelectorProps> = ({
  exchangeRateNames,
  selectedTargetCurrencies,
  updateTargetCurrencies,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateTargetCurrencies(event.target.value as string[]);
  };

  return (
    <FormControl variant="outlined" style={{ minWidth: 120, maxWidth: "100%" }}>
      <InputLabel id="multi-currency-selector">To</InputLabel>
      <Select
        label="To"
        labelId="demo-mutiple-checkbox-label"
        id="multi-currency-selector-checkbox"
        multiple
        value={selectedTargetCurrencies}
        onChange={handleChange}
        renderValue={(selected) => (selected as string[]).join(", ")}
      >
        {exchangeRateNames.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selectedTargetCurrencies.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiCurrencySelector;
