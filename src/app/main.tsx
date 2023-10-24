import ReactDOM from 'react-dom/client'
import React, { DOMElement } from "react";
import {App} from "./model/App";
import {Provider} from 'react-redux';
import {store} from './store/store';

const container =document.getElementById("root") as HTMLElement
ReactDOM.createRoot(container).render(<Provider store={store}><App /></Provider>)
