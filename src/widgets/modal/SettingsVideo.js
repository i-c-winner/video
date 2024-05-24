import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { app } from "../../app/model/constants/app";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/store/interfaceSlice";
const width = "600px";
const videoQty = {
    disabled: "disabled",
    low: "low",
    middle: "middle",
    height: "height",
};
const audioQty = {
    disabled: "disabled",
    enabled: "enabled",
};
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (_jsx("div", { role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}`, ...other, children: value === index && (_jsx(Box, { sx: {
                p: 3,
                bgcolor: "background.paper",
                width,
                margin: "0 auto",
                height: "25vh",
                paddingTop: "15px",
                boxSizing: "border-box",
            }, children: children })) }));
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const SettingsVideo = React.forwardRef(() => {
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    function changeQty(event) {
        const value = event.target.value;
        if (value === "disabled") {
            app.glagolVC.glagolManager.switchOffCamera();
        }
        else {
            app.glagolVC.glagolManager.switchOnCamera();
            app.glagolVC.glagolManager.applyConstraints(value);
        }
        dispatch(openModal(false));
    }
    function toggleAudio(event) {
        const value = event.target.value;
        if (value) {
            app.glagolVC.glagolManager.switchOffMic();
        }
        else {
            app.glagolVC.glagolManager.switchOnMic();
        }
        dispatch(openModal(false));
    }
    function getvideo() {
        function getDefault() {
            const cameraIsWorking = app.glagolVC.glagolManager.cameraIsWorking;
            if (!cameraIsWorking) {
                return "disabled";
            }
            return app.glagolVC.glagolManager.currentCameraQuantity;
        }
        return (_jsxs(FormControl, { sx: { textAlign: "center" }, children: [_jsx(FormLabel, { id: "demo-radio-buttons-group-label", children: t("modal.more.videoQty") }), _jsxs(RadioGroup, { sx: {
                        pointerEvents: "initial",
                    }, onChange: changeQty, "aria-labelledby": "demo-radio-buttons-group-label", defaultValue: getDefault, name: "radio-buttons-group", children: [_jsx(FormControlLabel, { value: videoQty.disabled, control: _jsx(Radio, {}), label: _jsx(Typography, { variant: "myText", children: t("modal.settings.disabled") }) }), _jsx(FormControlLabel, { value: videoQty.low, control: _jsx(Radio, {}), label: _jsx(Typography, { variant: "myText", children: t("modal.settings.low") }) }), _jsx(FormControlLabel, { value: videoQty.middle, control: _jsx(Radio, {}), label: _jsx(Typography, { variant: "myText", children: t("modal.settings.middle") }) }), _jsx(FormControlLabel, { value: videoQty.height, control: _jsx(Radio, {}), label: _jsx(Typography, { variant: "myText", children: t("modal.settings.high") }) })] })] }));
    }
    function getAudio() {
        function getDefault() {
            const microphoneIsWorking = app.glagolVC.glagolManager.microphoneIsWorking;
            if (!microphoneIsWorking) {
                return "disabled";
            }
            return "enabled";
        }
        return (_jsxs(FormControl, { children: [_jsx(FormLabel, { id: "demo-radio-buttons-group-label", children: t("modal.more.mute") }), _jsxs(RadioGroup, { sx: {
                        pointerEvents: "initial",
                    }, onChange: toggleAudio, "aria-labelledby": "demo-radio-buttons-group-label", defaultValue: getDefault(), name: "radio-buttons-group", children: [_jsx(FormControlLabel, { value: audioQty.enabled, control: _jsx(Radio, {}), label: _jsx(Typography, { variant: "myText", children: t("modal.settings.enabled") }) }), _jsx(FormControlLabel, { value: audioQty.disabled, control: _jsx(Radio, {}), label: _jsx(Typography, { variant: "myText", children: t("modal.settings.disabled") }) })] })] }));
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (_jsxs(Box, { sx: {
            width: "100%",
            paddingTop: "20vh",
            pointerEvents: "none",
            textAlign: "center",
            color: "white",
        }, children: [_jsx(Box, { sx: {
                    pointerEvents: "initial",
                    borderBottom: 1,
                    borderColor: "divider",
                    margin: "0 auto",
                    bgcolor: "background.paper",
                    padding: "10px 20px",
                    width,
                    boxSizing: "border-box",
                    textAlign: "center",
                }, children: _jsxs(Tabs, { value: value, onChange: handleChange, "aria-label": "basic tabs example", children: [_jsx(Tab, { label: t("modal.settings.video"), ...a11yProps(0) }), _jsx(Tab, { label: t("modal.settings.audio"), ...a11yProps(1) })] }) }), _jsx(CustomTabPanel, { value: value, index: 0, children: getvideo() }), _jsx(CustomTabPanel, { value: value, index: 1, children: getAudio() })] }));
});
export { SettingsVideo };
