import React from "react";
import { IconButton } from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

import { BidirectionalButtonStyled } from "./BidirectionalButton.styles";

interface BidirectionalButtonProps {
  onClick: Function;
}

const BidirectionalButton: React.FC<BidirectionalButtonProps> = ({ onClick }) => {
  return (
    <BidirectionalButtonStyled>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        size="small"
        id={"bidirectional-exchange-button"}
        onClick={() => onClick()}
      >
        <SyncAltIcon />
      </IconButton>
    </BidirectionalButtonStyled>
  );
};

export default BidirectionalButton;
