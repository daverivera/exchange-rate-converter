import React from "react";
import { shallow } from "../../test/enzyme";
import CurrencyDropdown from "../currency-dropdown/CurrencyDropdown";
import Exchange from "./Exchange";
import { Amount, ExchangeButton } from "./Exchange.styles";
import BidirectionalButton from "../bidirectional-button/BidirectionalButton";

jest.mock("../../hooks/useGetAllExchangeRateNames", () => ({
  useGetAllEchangeRateNames: () => ["USD", "EUR"]
}));

describe("Exchange", () => {
  it("render component correctly", () => {
    const component = shallow(<Exchange setCurrencyConversion={() => {}} />);

    expect(component.find(Amount).exists()).toBe(true);
    expect(component.find(BidirectionalButton).exists()).toBe(true);
    expect(component.find(CurrencyDropdown).exists()).toBe(true);
    expect(component.find(ExchangeButton).exists()).toBe(true);
  });
});
