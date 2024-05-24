import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Box } from "@mui/material";
function Popover(props) {
    function stopPropagation(ev) {
        ev.stopPropagation();
    }
    useEffect(() => {
        function closePopover() {
            props.onClose();
        }
        function closePopoverWithKey(ev) {
            if (ev.code === "Escape")
                props.onClose();
        }
        document.addEventListener("keydown", closePopoverWithKey);
        document.addEventListener("click", closePopover);
        return () => {
            document.removeEventListener("click", closePopover);
            document.removeEventListener("keydown", closePopoverWithKey);
        };
    });
    {
        return (props.state && (_jsx(Box, { sx: {
                position: "absolute",
                bottom: "0",
                zIndex: "10",
            }, onClick: stopPropagation, children: props.children })));
    }
}
export { Popover };
