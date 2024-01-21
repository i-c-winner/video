import { PaletteMode } from '@mui/material';

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
  },
  light: {
    palette: {
      mode: 'light' as PaletteMode,
      background: {
        paper: 'white',
        windows: '#222738',
        other: '#2a2f42'
      },
    },
  }



};
export { myTheme };
