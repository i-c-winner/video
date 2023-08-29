import ReactDOM from 'react-dom/client'
import React from "react";
import {darkTheme} from "./themes/theme";
import {ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {store} from "./store/store";
import {Provider} from "react-redux";
import "./index.scss"

const container =document.getElementById("root")
if (container!==null) {
  ReactDOM.createRoot(container).render(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </ThemeProvider>
  )
}


