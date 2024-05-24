import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Button } from "@mui/material";
import { CreateSvgIcon } from "../../../../features/CreaeteSvgIcon";
import { useState } from "react";
import { getStyles } from "../../../../features/UI/buttons/getStyles";
function ButtonWithIcon(props) {
    const [active, setActive] = useState(false);
    function action() {
        props.action(active);
        setActive(!active);
    }
    return (_jsx(Box, { sx: getStyles(props.wrapperStyles), children: _jsx(Button, { classes: props.classes, variant: props.variant, startIcon: _jsx(CreateSvgIcon, { styles: props.styles, sizes: props.sizes, icon: props.startIcon, ...props }), onClick: action }) }));
}
export { ButtonWithIcon };
