import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { DateSelectorStyled } from "./DateSelector.styles";

interface DateSelectorProps {
  historicalRateDay?: Date;
  setHistoricalRateDay: (historicalRateDay: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  historicalRateDay,
  setHistoricalRateDay,
}) => {
  const [showDateSelector, setShowDateSelector] = useState<boolean>(false);
  const toggleDateSelectorSwitch = () => {
    setShowDateSelector(!showDateSelector);
    setHistoricalRateDay(new Date()); // Reset historicalRateDay to today
  };

  return (
    <DateSelectorStyled container spacing={3}>
      <Grid xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={showDateSelector}
              onChange={toggleDateSelectorSwitch}
              color="primary"
            />
          }
          label="Use a specific date rate"
        />
      </Grid>
      <Grid xs={12}>
        {showDateSelector && (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={historicalRateDay}
              maxDate={new Date()}
              onChange={(date) => setHistoricalRateDay(date as Date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        )}
      </Grid>
    </DateSelectorStyled>
  );
};

export default DateSelector;
