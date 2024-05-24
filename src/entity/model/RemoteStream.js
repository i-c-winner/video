import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
function RemoteStream(props) {
    const refVideo = useRef(null);
    const [kind, setKind] = useState("");
    useEffect(() => {
        props.stream.getTracks().forEach((track) => {
            if (refVideo.current !== null)
                refVideo.current.srcObject = props.stream;
            setKind(track.kind);
        });
    }, []);
    function getClasses(type) {
        if (type === "audio") {
            return "video_remote video_remote_audio";
        }
        else if (type === "video") {
            return "video_remote video_remote_video";
        }
        return "video_remote";
    }
    function getBoxClasses(kind) {
        if (kind === "audio") {
            return "remote-box remote-box_audio";
        }
        else if (kind === "video") {
            return "remote-box remote-box_video";
        }
    }
    return (_jsx(Box, { className: getBoxClasses(kind), children: _jsx("video", { className: getClasses(kind), autoPlay: true, ref: refVideo }) }));
}
export { RemoteStream };
