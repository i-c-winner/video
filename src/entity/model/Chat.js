import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import "../styles/index.scss";
import React from "react";
import { BadgeAvatars } from "./avatar/BadgeAvatar";
function Chat(props) {
    const flexBox = {
        display: "flex",
        justifyContent: "space-between",
    };
    const card = (_jsxs(React.Fragment, { children: [_jsx(CardHeader, { sx: {
                    padding: "5px",
                }, title: _jsxs(Box, { sx: {
                        display: "flex",
                        justifyContent: "space-between",
                    }, children: [_jsx(Typography, { children: props.chat.author }), _jsx(Typography, { children: "Time" })] }) }), _jsx(CardContent, { sx: {
                    textAlign: "left",
                    padding: "6px",
                }, children: props.chat.text })] }));
    return (_jsxs(Box, { sx: {
            ...flexBox,
            marginBottom: "10px",
        }, children: [_jsx(Box, { sx: {
                    minWidth: "50px",
                    height: "50px",
                    marginRight: "10px",
                }, children: _jsx(BadgeAvatars
                // avatar={avatar}
                , { 
                    // avatar={avatar}
                    styles: { color: "orange" } }) }), _jsx(Card, { sx: {
                    flexGrow: "1",
                    color: "white",
                    bgcolor: "background.other",
                    padding: "5px 10px ",
                }, variant: "outlined", children: card })] }));
}
export { Chat };
