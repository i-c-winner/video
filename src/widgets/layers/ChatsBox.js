import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import { styles } from "../styles/styles";
import { Chat } from "../../entity/model/Chat";
import { getRandomText } from "../../features/plugins/getRandomText";
import { useSelector } from "react-redux";
import { ChatInputField } from "../../entity/model/ChatInputField";
import { ButtonWrapper } from "../../entity/model/UI/button/ButtonWrapper";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { changeChatsBox } from "../../app/store/interfaceSlice";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
function ChatsBox() {
    const theme = useTheme();
    const [colorText, setColorText] = useState("grey");
    const { chatsBoxVisible } = useSelector((state) => state.interface);
    const { chatsList } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    function openSettings() {
        dispatch(changeChatsBox(false));
    }
    useEffect(() => {
        setColorText(theme.palette.mode === "dark" ? "grey" : "black");
    }, [theme]);
    {
        return (chatsBoxVisible && (_jsx(Box, { sx: styles.chatsboxLayer, children: _jsxs(Box, { sx: styles.chatsboxLayer.chatsbox, children: [_jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-between",
                            color: "white",
                            boxSizing: "border-box",
                            alignItems: "center",
                        }, children: [_jsx(Typography, { variant: "myText", children: "Chat" }), _jsx(ButtonWrapper, { action: openSettings, children: _jsx(XMarkIcon, { color: colorText }) })] }), _jsxs(Box, { sx: {
                            height: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            flexFlow: "column",
                            overflowY: "hidden",
                        }, children: [_jsx("div", { className: "chats", children: chatsList.map((chat) => {
                                    return _jsx(Chat, { chat: chat }, getRandomText(5));
                                }) }), _jsx(ChatInputField, {})] })] }) })));
    }
}
export { ChatsBox };
