import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, TextField } from "@mui/material";
import { styleButton } from "../../styles/styles";
import { useTranslation } from "react-i18next";
const styleInput = {
    borderRadius: "8px",
};
function Profile() {
    const { t } = useTranslation();
    return (_jsxs(Box, { sx: {
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
            height: "220px",
        }, children: [_jsxs(Box, { sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "50px",
                    pointerEvents: "initial",
                }, children: [_jsx(TextField, { sx: styleInput, classes: {
                            root: "input_profile",
                        }, label: t("modal.settings.yourName") }), _jsx(TextField, { sx: styleInput, classes: {
                            root: "input_profile",
                        }, label: t("modal.settings.yourEmail") })] }), _jsxs(Box, { sx: {
                    display: "flex",
                    justifyContent: "flex-end",
                }, children: [_jsx(Button, { sx: styleButton, children: t("interface.buttons.close") }), _jsx(Button, { sx: styleButton, variant: "outlined", children: t("interface.buttons.saveAndClose") })] })] }));
}
export { Profile };
