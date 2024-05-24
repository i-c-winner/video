import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
const buttonsWithoutToggle = ["file", "record", "share"];
const baseClass = "my-button__toolbox";
function ButtonWrapper(props) {
    const [classes, setClasses] = useState(baseClass);
    const [toggled, setToggled] = useState(false);
    const { isRecording, chatsBoxVisible } = useSelector((state) => state.interface);
    const { video, audio } = useSelector((state) => state.interface.conference.quality);
    const { t } = useTranslation();
    function actionClick() {
        if (props?.text) {
            if (!buttonsWithoutToggle.includes(props.text)) {
                if (!toggled) {
                    setClasses(baseClass + " my-button__toolbox_toggled");
                }
                else {
                    setClasses(baseClass);
                }
            }
        }
        setToggled(!toggled);
        props.action();
    }
    useEffect(() => {
        switch (props.text) {
            case "record":
                if (isRecording) {
                    setClasses(baseClass + " my-button__toolbox_toggled_red");
                }
                else {
                    setClasses(baseClass);
                }
                break;
            case "share":
                if (props.toggled) {
                    setClasses(baseClass + " my-button__toolbox_toggled_red");
                }
                else {
                    setClasses(baseClass);
                }
                break;
            case "camera":
                if (!props.toggled) {
                    setClasses(baseClass + " my-button__toolbox_toggled_red");
                }
                else {
                    setClasses(baseClass);
                }
                break;
            case "mic":
                if (!props.toggled) {
                    setClasses(baseClass + " my-button__toolbox_toggled_red");
                }
                else {
                    setClasses(baseClass);
                }
                break;
            case "chat":
                if (chatsBoxVisible) {
                    setClasses(baseClass + " my-button__toolbox_toggled");
                }
                else {
                    setClasses(baseClass);
                }
                break;
            default:
                break;
        }
    }, [isRecording, props.toggled, audio, video, chatsBoxVisible]);
    return (_jsxs("div", { className: "button-box", children: [_jsx("div", { onClick: actionClick, className: classes, children: _jsx(Box, { sx: {
                        height: "24px",
                        width: "24px",
                        margin: "0 auto",
                    }, children: props.children }) }), props.text && (_jsx(Typography, { variant: "myText", children: t(`interface.icons.${props.text}`) }))] }));
}
export { ButtonWrapper };
