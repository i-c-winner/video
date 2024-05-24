import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RemoteStream } from "../../entity/model/RemoteStream";
import { Box, Typography } from "@mui/material";
import { styles } from "../styles/styles";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RemoteStreamsBoxTileMode } from "../RemoteStreamsBoxTileMode";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { BadgeAvatars } from "../../entity/model/avatar/BadgeAvatar";
import { app } from "../../app/model/constants/app";
import myAvatar from "../../../public/images/face2.jpeg";
import { getRandomText } from "../../features/plugins/getRandomText";
import { BigScreen } from "../../entity/model/BigScreen";
import { Icons } from "../../entity/model/icons/Icons";
const { remoteStreamLayer } = styles;
const styleImageButton = {
    height: "24px",
    width: "24px",
};
function RemoteStreamsBox(props) {
    const { glagolVC } = app;
    const [stream, setStream] = useState(new MediaStream());
    const { tileMode } = useSelector((state) => state.interface);
    function roomOn(stream) {
        setStream(stream[0]);
    }
    function changeBigScreen(stream) {
        setStream(stream[0]);
    }
    function getStyles() {
        return Object.assign(remoteStreamLayer.wrapper, {
            display: "flex",
            flexFlow: "column",
        });
    }
    function getColor() {
        switch (app.glagolVC.glagolManager.currentCameraQuantity) {
            case "low":
                return "red";
            case "middle":
                return "yellow";
            case "height":
                return "green";
            default:
                return "red";
        }
    }
    useEffect(() => {
        glagolVC.setHandler("roomOn", roomOn);
        glagolVC.setHandler("changeBigScreen", changeBigScreen);
    }, []);
    function getChildren() {
        if (!tileMode) {
            return (_jsx(Box, { sx: remoteStreamLayer, children: _jsxs(Box, { sx: getStyles(), children: [_jsxs(Box, { sx: {
                                margin: "0 0 0 auto",
                            }, position: "relative", children: [_jsx(Box, { sx: {
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        position: "absolute",
                                        top: "7px",
                                        padding: "2px",
                                        width: "95%",
                                        left: "5px",
                                    }, children: _jsx(Box, { sx: {
                                            ...styleImageButton,
                                            color: getColor(),
                                        }, children: _jsx(ChartBarIcon, {}) }) }), _jsx(BigScreen, { classes: "video video_my-video", stream: stream }, getRandomText(5)), _jsxs(Box, { sx: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        position: "absolute",
                                        bottom: "7px",
                                        padding: "2px",
                                        width: "95%",
                                        left: "5px",
                                        alignItems: "flex-end",
                                    }, children: [_jsx(Box, { sx: {
                                                position: "absolute",
                                            } }), _jsxs(Box, { sx: {
                                                display: "flex",
                                                alignItems: "flex-end",
                                            }, children: [_jsx(Icons, {}), _jsx(Typography, { sx: remoteStreamLayer.wrapper.displayName, color: "white", children: glagolVC.displayName }), _jsx(BadgeAvatars, { avatar: myAvatar, styles: {
                                                        color: "blue",
                                                    } })] })] })] }), _jsxs(Typography, { variant: "myText", pt: 4, children: ["\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432: ", props.streams.length / 2 + 1] }), _jsx(Box, { sx: {
                                flexGrow: "1",
                                pointerEvents: "initial",
                                height: "calc(100vh - 536px)",
                                overflowY: "auto",
                                overflowX: "hidden",
                            }, children: props.streams.map((stream) => {
                                return _jsx(RemoteStream, { stream: stream }, stream.id);
                            }) })] }) }));
        }
        else {
            return _jsx(RemoteStreamsBoxTileMode, {});
        }
    }
    return getChildren();
}
export { RemoteStreamsBox };
