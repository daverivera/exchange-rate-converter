import { Typography } from "@material-ui/core";
import React from "react";

const Header: React.FC = () => {
  return (
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Currency converter
    </Typography>
  );
};

export default Header;
