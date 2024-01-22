import { Palette, PaletteMode } from '@mui/material';

const myTheme = {
  dark: {
    palette: {
      mode: 'dark' as PaletteMode,
      background: {
        paper: '#151823',
        windows: '#222738',
        other: '#2a2f42'
      },
    },
    typography: {
      title: 'white',
      subtitle1: {
        color: 'grey'
      }
    }
  },
  light: {
    palette: {
      mode: 'light' as PaletteMode,
      background: {
        paper: 'white',
        windows: '#f3f4f6',
        other: 'grey'
      },
    },
    typography: {
      title: 'black',
      subtitle1: {
        color: 'black'
      }
    },
    components: {
      // Name of the component
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          backgroundcolor: 'red',
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
    },
  }



};
export { myTheme };
