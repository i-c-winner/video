import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button } from "@mui/material";
import { ButtonWithIcon } from "./ButtonWithIcon";
import { iconArrow } from "../../../../shared/img/svg";
import { CreateSvgIcon } from "../../../../features/CreaeteSvgIcon";
import { useState } from "react";
import { Popover } from "../popover/Popover";
function ButtonWithSubmenu(props) {
    const [popoverVisible, setPopoverVisible] = useState(false);
    function closeVisiblePopover() {
        setPopoverVisible(false);
    }
    function openVisiblePopover() {
        setPopoverVisible(true);
    }
    function toggledVisiblePopover(ev) {
        ev.stopPropagation();
        setPopoverVisible(!popoverVisible);
    }
    return (_jsxs(Box, { sx: {
            position: "relative",
        }, children: [_jsx(Box, { sx: {
                    position: "absolute",
                    bottom: "50px",
                    left: "25px",
                } }), _jsx(ButtonWithIcon, { ...props }), _jsxs(Button, { onClick: toggledVisiblePopover, sx: {
                    position: "absolute",
                    left: "37px",
                    top: "0",
                }, children: [_jsx(CreateSvgIcon, { sizes: {
                            width: "15px",
                            height: "10px",
                            viewBox: "3 0 10 10",
                        }, icon: iconArrow }), _jsx(Popover, { onOpen: openVisiblePopover, onClose: closeVisiblePopover, state: popoverVisible, children: props.children })] })] }));
}
export { ButtonWithSubmenu };
