import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Box } from "@mui/material";
import { getStyles } from "../../../../features/UI/buttons/getStyles";
import { CreateSvgIcon } from "../../../../features/CreaeteSvgIcon";
function ButtonWithText(props) {
    return (_jsx(Box, { sx: getStyles(props.wrapperStyles), children: _jsx(Button, { classes: props.classes, style: props.styles, startIcon: _jsx(CreateSvgIcon, { sizes: props.sizes, icon: props.startIcon }), onClick: props.action, variant: props.variant, children: props.text }) }));
}
export { ButtonWithText };
