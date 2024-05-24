import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../widgets/styles/index.scss";
import { Box } from "@mui/material";
import { TopPanel } from "../../widgets/layers/TopPanel";
import { LocalStream } from "../../widgets/layers/Localstream";
import { Toolbox } from "../../widgets/layers/Toolbox";
import { ChatsBox } from "../../widgets/layers/ChatsBox";
function RoomPage() {
    return (_jsxs(Box, { sx: {
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            bgcolor: "background.paper",
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
        }, children: [_jsxs(Box, { sx: {
                    flexGrow: "1",
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-between",
                    paddingRight: "16px",
                    boxSizing: "border-box",
                }, children: [_jsx(TopPanel, {}), _jsx(LocalStream, {}), _jsx(Toolbox, {})] }), _jsx(ChatsBox, {})] }));
}
export { RoomPage };
