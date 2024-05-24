import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import { MicrophoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { VideoCameraSlashIcon } from "@heroicons/react/20/solid";
import { MicOff } from "@mui/icons-material";
import * as React from "react";
import { useEffect, useState } from "react";
import { app } from "../../../app/model/constants/app";
const styleImageButton = {
    height: "24px",
    width: "24px",
};
function Icons() {
    const [cameraIsWorking, setCameraIsWorking] = useState(app.glagolVC.glagolManager.cameraIsWorking);
    const [micIsWorking, setMicIsWorking] = useState(app.glagolVC.glagolManager.microphoneIsWorking);
    function cameraSwitchOff() {
        setCameraIsWorking(false);
    }
    function cameraSwitchOn() {
        setCameraIsWorking(true);
    }
    function microphoneSwitchOff() {
        setMicIsWorking(false);
    }
    function microphoneSwitchOn() {
        setMicIsWorking(true);
    }
    useEffect(() => {
        app.glagolVC.glagolManager.setHandler("cameraSwitchOff", cameraSwitchOff);
        app.glagolVC.glagolManager.setHandler("cameraSwitchOn", cameraSwitchOn);
        app.glagolVC.glagolManager.setHandler("microphoneSwitchOff", microphoneSwitchOff);
        app.glagolVC.glagolManager.setHandler("microphoneSwitchOn", microphoneSwitchOn);
    }, []);
    return (_jsx(React.Fragment, { children: _jsxs(Box, { sx: {
                display: "flex",
                position: "relative",
            }, children: [cameraIsWorking ? (_jsx(Box, { sx: styleImageButton, children: _jsx(VideoCameraIcon, { color: "white" }) })) : (_jsx(Box, { sx: styleImageButton, children: _jsx(VideoCameraSlashIcon, { color: "red" }) })), micIsWorking ? (_jsx(Box, { sx: styleImageButton, children: _jsx(MicrophoneIcon, { color: "white" }) })) : (_jsx(Box, { sx: {
                        ...styleImageButton,
                        color: "red",
                    }, children: _jsx(MicOff, {}) }))] }) }));
}
export { Icons };
