import {  createTheme, Palette } from "@mui/material";
import {Colors } from "./colors";

const {
  PRIMARY_MAIN,
  ERROR_MAIN,
  WARNING_MAIN,
  BACKGROUND_DEFAULT,
  BACKGROUND_PAPER,
  TYPOGRAPHY_BODY1_COLOR
} = Colors

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: PRIMARY_MAIN,
    },
    error: {
      main: ERROR_MAIN
    },
    warning: {
      main: WARNING_MAIN
    },
    background: {
      default: BACKGROUND_DEFAULT,
      paper: BACKGROUND_PAPER
    }
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontSize: "1.5em",
			color: TYPOGRAPHY_BODY1_COLOR
    }
  }
})

export { darkTheme }
