import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef } from "react";
import { getRandomText } from "../../features/plugins/getRandomText";
function BigScreen(props) {
    const refVideo = useRef(null);
    useEffect(() => {
        if (refVideo.current !== null)
            refVideo.current.srcObject = props.stream;
    });
    return (_jsx(React.Fragment, { children: _jsx("video", { className: props.classes, autoPlay: true, ref: refVideo }, getRandomText(5)) }));
}
export { BigScreen };
