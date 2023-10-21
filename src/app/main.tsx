import ReactDOM from 'react-dom/client'
import React, { DOMElement } from "react";
import {App} from "./module/App";

const container =document.getElementById("root") as HTMLElement
ReactDOM.createRoot(container).render(<App />)
