import { createBrowserRouter } from "react-router-dom";
import { StartingPage } from "../../pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartingPage/>
  },
  {
    path: "/:room",
    element: <StartingPage/>
  }
])

export default router
