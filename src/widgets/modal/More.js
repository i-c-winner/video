import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeTypeModal, openModal } from "../../app/store/interfaceSlice";
import { selectingButtons } from "../../features/utils/selectingButtons";
import { getRandomText } from "../../features/plugins/getRandomText";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@mui/material";
import { ButtonWrapper } from "../../entity/model/UI/button/ButtonWrapper";
const styleBox = {
    bgcolor: "background.windows",
    width: "auto",
    pointerEvents: "initial",
};
const More = React.forwardRef(() => {
    const theme = useTheme();
    function getColor() {
        return theme.palette.mode === "dark" ? "grey" : "black";
    }
    const buttons = {
        settings: _jsx(Cog8ToothIcon, { color: getColor() }),
        settingsVideo: _jsx(ChartBarIcon, { color: getColor() }),
    };
    const allButtons = Object.keys(buttons);
    const currentButtons = ["settingsVideo"];
    const filteredButtons = selectingButtons(allButtons, currentButtons);
    const dispatch = useDispatch();
    function actionClick() {
        dispatch(changeTypeModal(this.type));
        dispatch(openModal(true));
    }
    const { t } = useTranslation();
    return (_jsx(Box, { sx: styleBox, children: _jsx("nav", { children: _jsx(List, { classes: {
                    root: "list",
                }, children: filteredButtons.map((button) => {
                    return (_jsx(ListItem, { classes: {
                            root: "list-more list-more__listitem",
                        }, sx: {
                            padding: "0",
                        }, children: _jsxs(ListItemButton, { onClick: actionClick.bind({
                                type: button,
                            }), sx: {
                                padding: "0",
                            }, divider: true, children: [_jsx(ButtonWrapper, { action: () => { }, children: buttons[button] }), _jsx(ListItemText, { sx: {
                                        padding: "0",
                                    }, children: _jsx(Typography, { variant: "myText", children: t(`modal.more.${button}`) }) })] }) }, getRandomText(8)));
                }) }) }) }));
});
export { More };
