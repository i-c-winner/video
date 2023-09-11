import { createBrowserRouter } from "react-router-dom";
import { StartingPage } from "../../pages";
import {Exit} from '../../pages/exit/Exit';
import * as path from 'path';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartingPage/>
  },
  {
    path: "/:room",
    element: <StartingPage/>
  },
  {
    path: '/exit',
    element: <Exit />
  }


])

export default router
