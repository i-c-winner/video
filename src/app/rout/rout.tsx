import { App } from "../model/App";
import { CreateDisplayName } from "../../page/model/CreateDisplayName";
import { CreateRoomName } from "../../page/model/CreateRoomName";
import { Exit } from "../../page/model/Exit";

const rout = [
  {
    path: "/:room",
    element: <App />,
  },

  {
    path: "/creatername",
    element: <CreateDisplayName />,
  },
  {
    path: "/exit",
    element: <Exit />,
  },
  {
    path: "/",
    element: <CreateRoomName />,
  },
];

export { rout };
