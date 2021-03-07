import React from "react";
import { shallow } from "../../test/enzyme";
import BidirectionalButton from "./BidirectionalButton";
import { IconButton } from "@material-ui/core";

describe("BidirectionalButton", () => {
  it("should render the component", () => {
    const onClick = jest.fn();
    const component = shallow(<BidirectionalButton onClick={onClick} />);

    component.find(IconButton).simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
