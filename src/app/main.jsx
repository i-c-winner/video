import ReactDOM from 'react-dom/client'
import React from "react";
import {App} from "./module/App";
import {darkTheme} from "./themes/theme";
import {ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./router/router";

const container =document.getElementById("root")
if (container!==null) {
  ReactDOM.createRoot(container).render(
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}


