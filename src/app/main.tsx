import ReactDOM from 'react-dom/client'
import React from "react";
import '../shared/styles/index.scss'
import { createTheme, ThemeProvider } from '@mui/material';
import { App } from './model/App';
import {theme} from '../shared/styles/theme';

const container =document.getElementById("root") as HTMLElement
ReactDOM.createRoot(container).render(
  <ThemeProvider theme={createTheme(theme)}>
    <App />
  </ThemeProvider>
  )
