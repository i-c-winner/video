import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { app } from "../../../app/model/constants/app";
import { useTranslation } from "react-i18next";
import { changeDevices } from "../../../features/devices/changeDevices";
const styleInput = {
    color: "white",
    borderRadius: "8px",
    background: "#181818",
};
function Devices() {
    const { t } = useTranslation();
    const [videoDevices, setVideoDevices] = useState([]);
    const [audioDevices, setAudioDevices] = useState([]);
    const [microphoneDevices, setMicrophoneDevices] = useState([]);
    const refVideo = useRef(null);
    useEffect(() => {
        const stream = new MediaStream();
        app.glagolVC.webRtc.getSenders().forEach((sender) => {
            if (sender.track?.kind === "video" &&
                sender.track?.contentHint !== "detail") {
                stream.addTrack(sender.track);
            }
        });
        if (refVideo.current)
            refVideo.current.srcObject = stream;
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            setVideoDevices(devices.filter((device) => device.kind === "videoinput"));
            setAudioDevices(devices.filter((device) => device.kind === "audiooutput"));
            setMicrophoneDevices(devices.filter((device) => device.kind === "audioinput"));
        });
    }, []);
    return (_jsxs(Box, { sx: { pointerEvents: "initial" }, display: "flex", children: [_jsx(Box, { children: _jsx("video", { autoPlay: true, className: "video video_settings", ref: refVideo }) }), _jsxs(Box, { sx: {
                    width: "95%",
                    marginLeft: "10px",
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-between",
                }, children: [_jsx(Autocomplete, { sx: styleInput, onInputChange: (event, value) => {
                            const filteredDevice = videoDevices.filter((device) => device.label === value);
                            changeDevices.camera(filteredDevice[0].deviceId);
                        }, renderInput: (params) => {
                            return (_jsx(TextField, { classes: {
                                    root: "input_devices",
                                }, ...params, label: t("modal.settings.video") }));
                        }, options: videoDevices }), _jsx(Autocomplete, { sx: styleInput, onInputChange: (event, value) => {
                            const filteredDevice = audioDevices.filter((device) => device.label === value);
                            console.log(filteredDevice[0]);
                            changeDevices.audio();
                        }, renderInput: (params) => {
                            return (_jsx(TextField, { classes: {
                                    root: "input_devices",
                                }, ...params, label: t("modal.settings.audio") }));
                        }, options: audioDevices }), _jsx(Autocomplete, { sx: styleInput, onInputChange: (event, value) => {
                            const filteredDevice = microphoneDevices.filter((device) => device.label === value);
                            changeDevices.mic(filteredDevice[0].deviceId);
                        }, renderInput: (params) => (_jsx(TextField, { classes: {
                                root: "input_devices",
                            }, ...params, label: t("modal.settings.microphone") })), options: microphoneDevices })] })] }));
}
export { Devices };
