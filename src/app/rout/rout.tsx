import {App} from "../model/App";
import {Exit} from '../../page/model/Exit';

const rout= [{
  path: '/',
  element: <App />,
  children: [{
    path: '/:room',
    element: <App />
  }]
},
  {
    path: '/exit',
    element: <Exit />
  }]

export {rout}
