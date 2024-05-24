import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { Devices } from "../../entity/model/modal/Devices";
import { Profile } from "../../entity/model/modal/Profile";
import { Calendar } from "../../entity/model/modal/Calendar";
import { More } from "./More";
const width = "600px";
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (_jsx("div", { role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}`, ...other, children: value === index && (_jsx(Box, { sx: {
                p: 3,
                bgcolor: "background.paper",
                width,
                margin: "0 auto",
                height: "25vh",
                minHeight: "250px",
                paddingTop: "15px",
                boxSizing: "border-box",
            }, children: children })) }));
}
function a11yProps(index, value) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
        sx: () => {
            const defaultStyle = {
                margin: "0 10px",
                padding: "4px",
            };
            if (index === value) {
                return {
                    ...defaultStyle,
                    backgroundColor: "#87bfff",
                    borderRadius: "3px",
                    color: "black",
                };
            }
            return { defaultStyle };
        },
    };
}
const Settings = React.forwardRef(() => {
    const [value, setValue] = React.useState(0);
    const { t } = useTranslation();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (_jsxs(Box, { sx: {
            width: "100%",
            paddingTop: "20vh",
            pointerEvents: "none",
        }, children: [_jsxs(Box, { sx: {
                    pointerEvents: "initial",
                    borderBottom: 1,
                    borderColor: "divider",
                    margin: "0 auto",
                    bgcolor: "background.paper",
                    padding: "3px 6px",
                    width,
                    boxSizing: "border-box",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                }, children: [_jsx(Typography, { variant: "myText", children: t("modal.settings.settings") }), _jsxs(Tabs, { sx: {
                            minHeight: "initial",
                        }, TabIndicatorProps: {
                            sx: { display: "none" },
                        }, textColor: "inherit", value: value, onChange: handleChange, "aria-label": "basic tabs example", children: [_jsx(Tab, { classes: {
                                    root: "my-button my-button__tabs",
                                }, component: "p", label: _jsx(Typography, { variant: "myText", children: t("modal.settings.devices") }), ...a11yProps(0, value) }), _jsx(Tab, { classes: {
                                    root: "my-button my-button__tabs",
                                }, component: "p", label: _jsx(Typography, { variant: "myText", children: t("modal.settings.profile") }), ...a11yProps(1, value) }), _jsx(Tab, { classes: {
                                    root: "my-button my-button__tabs",
                                }, component: "p", label: _jsx(Typography, { variant: "myText", children: t("modal.settings.calendar") }), ...a11yProps(2, value) }), _jsx(Tab, { classes: {
                                    root: "my-button my-button__tabs",
                                }, component: "p", label: _jsx(Typography, { variant: "myText", children: t("modal.settings.more") }), ...a11yProps(3, value) })] })] }), _jsx(CustomTabPanel, { value: value, index: 0, children: _jsx(Devices, {}) }), _jsx(CustomTabPanel, { value: value, index: 1, children: _jsx(Profile, {}) }), _jsx(CustomTabPanel, { value: value, index: 2, children: _jsx(Calendar, {}) }), " ", _jsx(CustomTabPanel, { value: value, index: 3, children: _jsx(More, {}) }), _jsx(Box, { sx: {
                    margin: "0 auto",
                    width,
                    bgcolor: "background.paper",
                    textAlign: "right",
                    padding: "10px",
                    boxSizing: "border-box",
                    pointerEvents: "initial",
                } })] }));
});
export { Settings };
