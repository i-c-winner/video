import { useRef, useEffect } from "react";
import { glagol } from "../../entities/glagol/glagol";
import { Box } from "@mui/material";
import "../styles/index.scss";

function BigScreen() {
  const refVideo = useRef<any>();
  useEffect(() => {
    refVideo.current.srcObject = glagol.localStream;
  });
  return (
    <Box>
      <video autoPlay={true} ref={refVideo} className="video video__bigscreen"/>
    </Box>
  );
}

export { BigScreen };
