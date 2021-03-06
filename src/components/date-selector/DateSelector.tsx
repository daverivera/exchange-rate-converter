import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormControlLabel
          id="date-select-toggle-button"
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
      {showDateSelector && (
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="date-select-datepicker"
              label="Date picker inline"
              value={historicalRateDay}
              maxDate={new Date()}
              onChange={(date) => setHistoricalRateDay(date as Date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      )}
    </Grid>
  );
};

export default DateSelector;
