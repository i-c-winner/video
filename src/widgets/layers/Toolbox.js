import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from "@mui/material";
import { ModalWindow } from "../modal/ModalWindow";
import { styles } from "../styles/styles";
import { ChatBubbleOvalLeftEllipsisIcon, FolderPlusIcon, MicrophoneIcon, ShareIcon, StopCircleIcon, VideoCameraIcon, } from "@heroicons/react/16/solid";
import { ButtonWrapper } from "../../entity/model/UI/button/ButtonWrapper";
import { changeChatsBox, changeIsRecording, changeTypeModal, openModal, } from "../../app/store/interfaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Recording } from "../../features/manager/record";
import { MicOff } from "@mui/icons-material";
import { VideoCameraSlashIcon } from "@heroicons/react/24/solid";
import { app } from "../../app/model/constants/app";
import { addFile } from "../../app/store/filesSlice";
import { addChat } from "../../app/store/chatsSlice";
let recording = null;
function Toolbox() {
    const glagolVC = app.glagolVC;
    const [iSharing, setISharing] = useState(false);
    const { chatsBoxVisible, isRecording, modalIsOpen } = useSelector((state) => state.interface);
    const [cameraIsWorking, setCameraIsWorking] = useState(true);
    const [microphoneIsWorking, setMicrophoneIsWorking] = useState(true);
    const dispatch = useDispatch();
    const [colorText, setColorText] = useState("grey");
    const theme = useTheme();
    function openChat() {
        dispatch(changeChatsBox(!chatsBoxVisible));
    }
    function recordAction() {
        dispatch(changeIsRecording(!isRecording));
    }
    function sharingAction() {
        if (iSharing) {
            glagolVC.sharingStop();
            setISharing(false);
        }
        else {
            setISharing(true);
            glagolVC.sharingStart();
        }
    }
    function openingModal() {
        dispatch(changeTypeModal(this.type));
        dispatch(openModal(!modalIsOpen));
    }
    function toggledCamera() {
        const cameraIsWorking = app.glagolVC.glagolManager.cameraIsWorking;
        if (cameraIsWorking) {
            app.glagolVC.glagolManager.switchOffCamera();
        }
        else {
            app.glagolVC.glagolManager.switchOnCamera();
        }
    }
    function toggledMicrophone() {
        const microphoneIsWorking = app.glagolVC.glagolManager.microphoneIsWorking;
        if (microphoneIsWorking) {
            app.glagolVC.glagolManager.switchOffMic();
        }
        else {
            app.glagolVC.glagolManager.switchOnMic();
        }
    }
    function fileDownload(args) {
        dispatch(addFile({
            text: args[0],
            idRemote: args[1],
        }));
    }
    function abortingSharing() {
        setISharing(false);
    }
    function setMessageChat(chat) {
        dispatch(addChat(chat[0]));
    }
    function cameraSwitchOff() {
        setCameraIsWorking(false);
    }
    function cameraSwitchOn() {
        setCameraIsWorking(true);
    }
    function microphoneSwitchOff() {
        setMicrophoneIsWorking(false);
    }
    function microphoneSwitchOn() {
        setMicrophoneIsWorking(true);
    }
    function changeCameraAndMic() {
        const cameraIsWorking = app.glagolVC.glagolManager.cameraIsWorking;
        const microphoneIsWorking = app.glagolVC.glagolManager.microphoneIsWorking;
        if (!cameraIsWorking)
            cameraSwitchOff();
        if (!microphoneIsWorking)
            microphoneSwitchOff();
    }
    function setHandlers() {
        glagolVC.glagolManager.setHandler("cameraSwitchOff", cameraSwitchOff);
        glagolVC.glagolManager.setHandler("cameraSwitchOn", cameraSwitchOn);
        glagolVC.glagolManager.setHandler("microphoneSwitchOff", microphoneSwitchOff);
        glagolVC.glagolManager.setHandler("microphoneSwitchOn", microphoneSwitchOn);
    }
    useEffect(() => {
        glagolVC.setHandler("abortingSharing", abortingSharing);
        glagolVC.setHandler("fileDownload", fileDownload);
        glagolVC.setHandler("setMessageChat", setMessageChat);
        glagolVC.setHandler("roomOn", setHandlers);
        glagolVC.setHandler("roomOn", changeCameraAndMic);
        return () => {
            /**
             * TODO remove handler
             */
        };
    }, []);
    useEffect(() => {
        setColorText(() => {
            return theme.palette.mode === "dark" ? "grey" : "black";
        });
    }, [theme]);
    useEffect(() => {
        if (isRecording) {
            const rec = new Recording();
            rec
                .init()
                .then((result) => {
                rec.createRecorder(result);
                rec.createListeners();
                rec.start();
                recording = rec;
            })
                .catch((error) => {
                new Error(error);
                dispatch(changeIsRecording(false));
            });
        }
        else {
            recording?.stop();
        }
    }, [isRecording]);
    return (_jsxs(Box, { sx: styles.toolboxLayer, children: [_jsx(ModalWindow, {}), _jsxs(Box, { sx: {
                    ...styles.toolboxLayer.toolbox,
                    color: colorText,
                }, children: [_jsx(ButtonWrapper, { text: "chat", action: openChat, children: _jsx(ChatBubbleOvalLeftEllipsisIcon, { color: colorText }) }), _jsx(ButtonWrapper, { text: "file", action: openingModal.bind({
                            type: "file",
                        }), children: _jsx(FolderPlusIcon, { color: colorText }) }), _jsx(ButtonWrapper, { toggled: iSharing, text: "share", action: sharingAction, children: _jsx(ShareIcon, { color: colorText }) }), _jsx(ButtonWrapper, { text: "record", action: recordAction, children: _jsx(StopCircleIcon, { color: colorText }) }), _jsx(ButtonWrapper, { text: "mic", toggled: microphoneIsWorking, action: toggledMicrophone, children: microphoneIsWorking ? (_jsx(MicrophoneIcon, { color: colorText })) : (_jsx(Box, { sx: { color: "white" }, children: _jsx(MicOff, {}) })) }), _jsx(ButtonWrapper, { text: "camera", toggled: cameraIsWorking, action: toggledCamera, children: cameraIsWorking ? (_jsx(VideoCameraIcon, { color: colorText })) : (_jsx(VideoCameraSlashIcon, { color: "white" })) })] })] }));
}
export { Toolbox };
