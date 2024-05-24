import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import { styles } from "../styles/styles";
import { useTranslation } from "react-i18next";
import { getInputStyles } from "../../features/styles/getInputStyles";
import { MicrophoneIcon, VideoCameraIcon, VideoCameraSlashIcon, } from "@heroicons/react/24/outline";
import { MicOff } from "@mui/icons-material";
import { app } from "../../app/model/constants/app";
import { useNavigate } from "react-router-dom";
function CreateDisplayName() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [cameraIsWorking, setcameraIsWorking] = useState(true);
    const [microphoneIsWorking, setMicrophoneIsWorking] = useState(true);
    const actions = {
        videoChange: () => {
            app.startingParameters.cameraIsWorking =
                !app.startingParameters.cameraIsWorking;
            setcameraIsWorking(!cameraIsWorking);
        },
        audioChange: () => {
            app.startingParameters.microphoneIsWorking =
                !app.startingParameters.microphoneIsWorking;
            setMicrophoneIsWorking(!microphoneIsWorking);
        },
    };
    const buttonText = "interface.buttons.createDisplayName";
    function action(event) {
        app.displayName = event.target.value;
    }
    function goPage() {
        app.appCreated = true;
        navigate(`/${app.roomName}`);
    }
    useEffect(() => {
        function handlerKey(event) {
            if (event.key === "Enter") {
                goPage();
            }
        }
        window.addEventListener("keydown", handlerKey);
        return () => {
            window.removeEventListener("keydown", handlerKey);
        };
    });
    return (_jsxs(Box, { sx: styles.wrapper, children: [_jsx(Input, { placeholder: "input yourName", onChange: action, sx: getInputStyles() }), _jsx(Button, { onClick: goPage, children: _jsx(Typography, { variant: "myText", children: t(buttonText) }) }), _jsxs(Box, { sx: {
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                }, children: [_jsx(Box, { onClick: actions.videoChange, sx: {
                            width: "25px",
                            height: "25px",
                            marginRight: "10px",
                        }, children: cameraIsWorking ? (_jsx(VideoCameraIcon, { color: "green" })) : (_jsx(VideoCameraSlashIcon, { color: "red" })) }), _jsx(Box, { onClick: actions.audioChange, sx: {
                            width: "25px",
                            height: "25px",
                        }, children: microphoneIsWorking ? (_jsx(MicrophoneIcon, { color: "green" })) : (_jsx(Box, { sx: { color: "red" }, children: _jsx(MicOff, {}) })) })] })] }));
}
export { CreateDisplayName };
