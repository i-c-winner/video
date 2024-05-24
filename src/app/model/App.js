import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { styles } from "../styles";
import { myTheme } from "../../shared/styles/theme";
import { app } from "./constants/app";
import Glagol from "../../../my-module/src/components/CreaterGlagol";
import { useNavigate } from "react-router-dom";
import { RoomPage } from "../../page/model/RoomPage";
const ThemeContext = React.createContext({
    toggleTheme: () => { },
});
function App() {
    const navigate = useNavigate();
    const [children, setChildren] = useState(_jsx("p", { children: "Doumloads" }));
    const refBox = useRef();
    const [mode, setMode] = useState("dark");
    const colorMode = React.useMemo(() => ({
        toggleTheme: () => {
            setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        },
    }), []);
    const theme = React.useMemo(() => createTheme(mode === "dark" ? myTheme.dark : myTheme.light), [mode]);
    function connectionOn(...args) {
        console.info("Комната создана", args);
        setChildren(_jsx(RoomPage, {}));
    }
    useEffect(() => {
        Glagol.setHandler("connectionOn", connectionOn);
        const path = window.location.pathname.split("/")[1];
        if (path && !app.appCreated) {
            app.roomName = path;
            navigate("/creatername");
        }
        else {
            const createrGlagol = new Glagol({
                roomName: app.roomName,
                displayName: app.displayName,
                xmppUrl: "https://xmpp.prosolen.net:5281/http-bind",
                webUrl: {
                    iceCandidatePoolSize: 5,
                    iceServers: [
                        {
                            urls: "stun:stun.l.google.com:19302",
                        },
                        {
                            urls: "stun:vks.knodl.tech:80",
                        },
                        {
                            urls: "turn:vks.knodl.tech:80",
                            username: "nehy$.pth-3084659",
                            credential: "l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv",
                        },
                        {
                            urls: "turns:vks.knodl.tech:443",
                            username: "nehy$.pth-3084659",
                            credential: "l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv",
                        },
                        {
                            urls: "turns:vks.knodl.tech:443?transport=tcp",
                            username: "nehy$.pth-3084659",
                            credential: "l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv",
                        },
                    ],
                },
            });
            createrGlagol.createGlagol();
            createrGlagol.register();
            app.glagolVC = createrGlagol.getGlagol();
        }
    }, []);
    return (_jsx(ThemeContext.Provider, { value: colorMode, children: _jsx(ThemeProvider, { theme: theme, children: _jsx(Box, { ref: refBox, sx: styles.main, children: children }) }) }));
}
export { App, ThemeContext };
