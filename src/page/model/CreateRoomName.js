import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Box, Input, Typography, Button } from "@mui/material";
import { styles } from "../styles/styles";
import { getInputStyles } from "../../features/styles/getInputStyles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { app } from "../../app/model/constants/app";
function CreateRoomName() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const refInput = useRef();
    function change(event) {
        app.roomName = event.target.value;
    }
    const buttonText = "interface.buttons.createRoomName";
    function actionClick() {
        navigate(`/creatername`);
    }
    useEffect(() => {
        function handlerKey(event) {
            if (event.key === "Enter") {
                actionClick();
            }
        }
        window.addEventListener("keydown", handlerKey);
        return () => {
            window.removeEventListener("keydown", handlerKey);
        };
    });
    return (_jsxs(Box, { sx: styles.wrapper, children: [_jsx(Input, { placeholder: "Input RoomName", onChange: change, sx: getInputStyles(), ref: refInput }), _jsx(Button, { onClick: actionClick, children: _jsx(Typography, { variant: "myText", children: t(buttonText) }) })] }));
}
export { CreateRoomName };
