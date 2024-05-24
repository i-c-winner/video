import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { RemoteStreamsBox } from "./RemoteStreamsBox";
import { Box } from "@mui/material";
import { styles } from "../styles/styles";
import { BadgeAvatars } from "../../entity/model/avatar/BadgeAvatar";
import { getRandomText } from "../../features/plugins/getRandomText";
import { app } from "../../app/model/constants/app";
import { BigScreen } from "../../entity/model/BigScreen";
function LocalStream() {
    const [remoteStreams, setRemoteStreams] = useState([]);
    const [on, setOn] = useState(false);
    const [stream, setStream] = useState(new MediaStream());
    const refVideo = useRef(null);
    const glagolVC = app.glagolVC;
    function addTrack(...args) {
        setRemoteStreams((prevRemotestream) => {
            return prevRemotestream.concat(args[0]);
        });
    }
    function removeTrack(mediaStreams) {
        setRemoteStreams((prevRemoteStream) => {
            return prevRemoteStream.filter((element) => {
                return element !== mediaStreams[0];
            });
        });
    }
    function roomOn(mediaStream) {
        setStream(mediaStream[0]);
        setOn(true);
        const { microphoneIsWorking, cameraIsWorking } = app.startingParameters;
        if (!microphoneIsWorking) {
            app.glagolVC.glagolManager.switchOffMic();
        }
        if (!cameraIsWorking) {
            app.glagolVC.glagolManager.switchOffCamera();
        }
    }
    function sendSharing(mediaStream) {
        if (refVideo.current)
            refVideo.current.srcObject = mediaStream[0];
        setStream(mediaStream[0]);
        setOn(true);
    }
    function changeBigScreen(mediaStream) {
        setStream(mediaStream[0]);
        setOn(true);
    }
    useEffect(() => {
        glagolVC.setHandler("sendSharing", sendSharing);
        glagolVC.setHandler("addTrack", addTrack);
        glagolVC.setHandler("roomOn", roomOn);
        glagolVC.setHandler("removeTrack", removeTrack);
        glagolVC.setHandler("changeBigScreen", changeBigScreen);
    }, []);
    return (_jsxs(Box, { sx: styles.localeStyleLayer, children: [_jsx(RemoteStreamsBox, { streams: remoteStreams }), _jsxs(Box, { sx: { position: "relative", width: "100%" }, children: [!on && (_jsx(Box, { sx: {
                            position: "absolute",
                            width: "100%",
                            paddingTop: "10vh",
                        }, children: _jsx(BadgeAvatars, { styles: {
                                color: "green",
                            }, sizes: {
                                width: 200,
                                height: 200,
                            } }) })), _jsx(Box, { sx: {
                            position: "absolute",
                            color: "red",
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        } }, getRandomText(5)), _jsx(BigScreen, { classes: "video video_local", stream: stream })] }), ";"] }));
}
export { LocalStream };
