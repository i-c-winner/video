import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, CardHeader, Typography, useTheme } from "@mui/material";
import { styles } from "../styles/styles";
// import { glagol } from '../../entity/conference/glagol';
import { useTranslation } from "react-i18next";
import { iconLogo } from "../../shared/img/svg";
import { CreateSvgIcon } from "../../features/CreaeteSvgIcon";
import { SunIcon, AdjustmentsVerticalIcon, MoonIcon, ArrowTopRightOnSquareIcon, } from "@heroicons/react/24/outline";
import { ButtonWrapper } from "../../entity/model/UI/button/ButtonWrapper";
import { useDispatch } from "react-redux";
import { openModal, changeTypeModal } from "../../app/store/interfaceSlice";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../app/model/App";
import { app } from "../../app/model/constants/app";
const sizes = {
    width: "50px",
    height: "50px",
    viewBox: "-4 0 40 40",
};
const interfaceRoom = "interface.room";
function TopPanel() {
    const [colorText, setColorText] = useState("grey");
    const theme = useTheme();
    const themeContext = useContext(ThemeContext);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function exit() {
        app.glagolVC.webRtc.close();
        navigate("/exit");
    }
    function changeTheme() {
        themeContext.toggleTheme();
    }
    function openSettings() {
        dispatch(changeTypeModal("settings"));
        dispatch(openModal(true));
    }
    useEffect(() => {
        setColorText(() => {
            return theme.palette.mode === "dark" ? "grey" : "black";
        });
    });
    return (_jsxs(Box, { sx: styles.topPanelLayer, children: [_jsx(CreateSvgIcon, { sizes: sizes, styles: styles.topPanelLayer.logo, icon: iconLogo }), _jsxs(Box, { sx: {
                    ...styles.topPanelLayer.panel,
                    color: colorText,
                }, children: [_jsx(CardHeader, { title: t(interfaceRoom), subheader: _jsx(Typography, { variant: "myText", sx: {}, children: app.glagolVC.roomName }) }), _jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-around",
                            color: colorText,
                        }, children: [_jsx(ButtonWrapper, { action: changeTheme, children: theme.palette.mode === "dark" ? (_jsx(SunIcon, { color: colorText })) : (_jsx(MoonIcon, { color: colorText })) }), _jsx(ButtonWrapper, { action: openSettings, children: _jsx(AdjustmentsVerticalIcon, { color: colorText }) }), _jsx(ButtonWrapper, { action: exit, children: _jsx(ArrowTopRightOnSquareIcon, { color: colorText }) })] })] })] }));
}
export { TopPanel };
