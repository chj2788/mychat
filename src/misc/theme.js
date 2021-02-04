import { createMuiTheme } from "@material-ui/core";
import { blue, lightBlue } from "@material-ui/core/colors";
import React from "react";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
  },
});

export default theme;
