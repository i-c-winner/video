import ReactDOM from 'react-dom/client'
import React from "react";

import {Provider} from 'react-redux';
import { App } from './model/App';

const container =document.getElementById("root") as HTMLElement
ReactDOM.createRoot(container).render(<App />)
