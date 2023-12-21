import {App} from "../model/App";

const rout= [{
  path: '/',
  element: <App />,
  children: [{
    path: '/:room',
    element: <App />
  }]

}]

export {rout}
