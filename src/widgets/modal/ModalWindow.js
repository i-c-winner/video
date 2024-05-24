import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../app/store/interfaceSlice";
import { Settings } from "./Settings";
import { Error } from "./Error";
import { More } from "./More";
import { SettingsVideo } from "./SettingsVideo";
import { File } from "./FIle";
const allChildren = {
    settingsVideo: _jsx(SettingsVideo, {}),
    settings: _jsx(Settings, {}),
    more: _jsx(More, {}),
    file: _jsx(File, {}),
    error: _jsx(Error, {}),
};
function ModalWindow() {
    const dispatch = useDispatch();
    const { modalIsOpen, typeModal } = useSelector((state) => state.interface);
    function handleClose() {
        dispatch(openModal(false));
    }
    function getChildren() {
        return allChildren[typeModal] ? allChildren[typeModal] : allChildren.error;
    }
    return (_jsx(Modal
    // @ts-ignore
    , { 
        // @ts-ignore
        children: getChildren(), open: modalIsOpen, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description", classes: {
            root: "my-modal",
        } }));
}
export { ModalWindow };
