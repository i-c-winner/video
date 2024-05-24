import { jsx as _jsx } from "react/jsx-runtime";
import { App } from "../model/App";
import { CreateDisplayName } from "../../page/model/CreateDisplayName";
import { CreateRoomName } from "../../page/model/CreateRoomName";
import { Exit } from "../../page/model/Exit";
const rout = [
    {
        path: "/:room",
        element: _jsx(App, {}),
    },
    {
        path: "/creatername",
        element: _jsx(CreateDisplayName, {}),
    },
    {
        path: "/exit",
        element: _jsx(Exit, {}),
    },
    {
        path: "/",
        element: _jsx(CreateRoomName, {}),
    },
];
export { rout };
