import { InputLabel } from "@material-ui/core";
import React from "react";
import { shallow } from "../../test/enzyme";
import { Currency } from "../../types/Currency";
import CurrencyDropdown from "./CurrencyDropdown";

describe("CurrencyDropdown", () => {
  it("render the component", () => {
    const currency = {
      currency: "EUR",
      symbol: "€",
    } as Currency;
    const id = "currency-dropdown";
    const label = "Target";
    const exchangeRateNames = ["USD", "EUR"];

    const component = shallow(
      <CurrencyDropdown
        currency={currency}
        exchangeRateNames={exchangeRateNames}
        id={id}
        label={label}
        setCurrencyValue={() => {}}
      />
    );

    expect(component.find(InputLabel).text()).toEqual(label);
    expect(component.find(InputLabel).prop("id")).toEqual(id);
  });
});
