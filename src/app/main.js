import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./rout/router";
import "../shared/styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./i18n/i18n";
const container = document.getElementById("root");
ReactDOM.createRoot(container).render(_jsx(Provider, { store: store, children: _jsx(RouterProvider, { router: router }) }));
