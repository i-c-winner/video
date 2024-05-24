import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import { getRandomText } from "../features/plugins/getRandomText";
function RemoteStreamsBoxTileMode() {
    const { tileMode } = useSelector((state) => state.interface);
    const { remoteStreams } = useSelector((state) => state.source);
    {
        return (tileMode && (_jsx(Box, { children: _jsx(Grid, { container: true, spacing: 3, children: remoteStreams.map((element) => {
                    return (_jsx(React.Fragment, { children: _jsx(Grid, { sx: () => element.type === "audio" ? { display: "none" } : {}, item: true, xs: 3 }, getRandomText(5)) }));
                }) }) })));
    }
}
export { RemoteStreamsBoxTileMode };
