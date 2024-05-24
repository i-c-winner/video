import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@mui/material";
function Submenu(props) {
    return (_jsx(Box, { sx: {
            color: "white",
            padding: "10px",
            bgcolor: "background.paper",
            "&:checked": {
                color: "green",
            },
        }, children: props.children }));
}
export { Submenu };
