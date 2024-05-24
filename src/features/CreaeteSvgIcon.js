import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { constants } from "../shared/config";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
function CreateSvgIcon(props) {
    const { t } = useTranslation();
    const { width, height, viewBox } = constants.icon.buttonIcon;
    const refIcon = useRef(null);
    const tooltipKey = () => {
        if (props.tooltipKey) {
            return t(`interface.icons.${props.tooltipKey}`);
        }
        return "";
    };
    useEffect(() => {
        if (refIcon.current !== null && props.icon)
            refIcon.current.insertAdjacentHTML("afterbegin", props.icon.content);
    }, []);
    return (_jsx(Tooltip, { title: tooltipKey(), placement: "top", children: _jsx("svg", { style: props.styles, fill: "currentColor", ref: refIcon, id: props.icon?.attributes.id, version: props.icon?.attributes.version, xmlns: props.icon?.attributes.xmlns, viewBox: props.sizes?.viewBox ? props.sizes.viewBox : viewBox, width: props.sizes?.width ? props.sizes?.width : width, height: props.sizes?.height ? props.sizes?.height : height }) }));
}
export { CreateSvgIcon };
