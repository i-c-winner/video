import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material";

const myTheme = {
  dark: {
    palette: {
      mode: "dark" as PaletteMode,
      background: {
        paper: "#151823",
        windows: "#222738",
        other: "#2a2f42",
      },
    },
    typography: {
      title: "white",
      myText: {
        color: "grey",
      },
    },
  } as ThemeOptions,
  light: {
    palette: {
      mode: "light" as PaletteMode,
      background: {
        paper: "white",
        windows: "#f3f4f6",
        other: "grey",
      },
    },
    typography: {
      title: "black",
      myText: {
        color: "black",
      },
      poster: {
        fontSize: "4rem",
        color: "red",
      },
      // Disable h3 variant
      h3: undefined,
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            poster: "h1",
          },
        },
      },
    },
  } as ThemeOptions,
};
export { myTheme };
