import ReactDOM from 'react-dom/client'
import React, { DOMElement } from "react";

import {Provider} from 'react-redux';
import {store} from './store/store';
import { Loginin } from './model/Loginin';
import { Proba } from './Proba';
import {ProbaMain} from './ProbaMain';
import { App } from './model/App';

const container =document.getElementById("root") as HTMLElement
// ReactDOM.createRoot(container).render(<Provider store={store}><ProbaMain /></Provider>)
ReactDOM.createRoot(container).render(<Provider store={store}><App /></Provider>)
// ReactDOM.createRoot(container).render(<Provider store={store}><Loginin /></Provider>)
