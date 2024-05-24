import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, useTheme } from "@mui/material";
import { styles } from "../../widgets/styles/styles";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDownTrayIcon, PaperAirplaneIcon, } from "@heroicons/react/24/outline";
import { saveChat } from "../../features/chats/saveChat";
import { app } from "../../app/model/constants/app";
import { ButtonWrapper } from "./UI/button/ButtonWrapper";
import { addChat } from "../../app/store/chatsSlice";
function ChatInputField() {
    const { glagolVC } = app;
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const { chatsList } = useSelector((state) => state.chats);
    const theme = useTheme();
    function sendMessage() {
        setText("");
        if (refInput.current?.value) {
            glagolVC.sendChatMessage(refInput.current?.value);
            dispatch(addChat({
                text: refInput.current?.value,
                author: glagolVC.displayName,
            }));
        }
    }
    function changeText(event) {
        setText(event.target.value);
    }
    function saveMessages() {
        saveChat(chatsList);
    }
    function getInputBackground() {
        if (theme.palette.mode === "dark") {
            return "input-field input-field_dark";
        }
        return "input-field input-field_light";
    }
    const refInput = useRef(null);
    return (_jsx(Box, { sx: styles.chatsboxLayer.chatInputField, children: _jsxs(Box, { sx: { boxSizing: "border-box" }, display: "flex", justifyContent: "space-between", width: "100%", children: [_jsx(Box, { children: _jsx(ButtonWrapper, { action: saveMessages, children: _jsx(ArrowDownTrayIcon, {}) }) }), _jsx(TextField, { hiddenLabel: true, classes: {
                        root: getInputBackground(),
                    }, onChange: changeText, value: text, inputRef: refInput, id: "standard-multiline-flexible", multiline: true, color: "primary", maxRows: 4, variant: "standard" }), _jsx(ButtonWrapper, { action: sendMessage, children: _jsx(PaperAirplaneIcon, {}) })] }) }));
}
export { ChatInputField };
