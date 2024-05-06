import { Box } from "@mui/material";
import { MicrophoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { VideoCameraSlashIcon } from "@heroicons/react/20/solid";
import { MicOff } from "@mui/icons-material";
import * as React from "react";
import { useEffect, useState } from "react";
import { app } from "../../../app/model/constants/app";
import { styles } from "../../../widgets/styles/styles";

const { remoteStreamLayer } = styles;
const styleImageButton = {
  height: "24px",
  width: "24px",
};

function Icons() {
  const [cameraIsWorking, setCameraIsWorking] = useState<boolean>(
    app.glagolVC.glagolManager.cameraIsWorking,
  );
  const [micIsWorking, setMicIsWorking] = useState<boolean>(
    app.glagolVC.glagolManager.microphoneIsWorking,
  );
  function cameraSwitchOff() {
    setCameraIsWorking(false);
  }

  function cameraSwitchOn() {
    setCameraIsWorking(true);
  }

  function microphoneSwitchOff() {
    setMicIsWorking(false);
  }

  function microphoneSwitchOn() {
    setMicIsWorking(true);
  }

  useEffect(() => {
    app.glagolVC.glagolManager.setHandler("cameraSwitchOff", cameraSwitchOff);
    app.glagolVC.glagolManager.setHandler("cameraSwitchOn", cameraSwitchOn);
    app.glagolVC.glagolManager.setHandler(
      "microphoneSwitchOff",
      microphoneSwitchOff,
    );
    app.glagolVC.glagolManager.setHandler(
      "microphoneSwitchOn",
      microphoneSwitchOn,
    );
  }, []);
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          position: "relative",
        }}
      >
        {cameraIsWorking ? (
          <Box sx={styleImageButton}>
            <VideoCameraIcon color="white" />
          </Box>
        ) : (
          <Box sx={styleImageButton}>
            <VideoCameraSlashIcon color="red" />
          </Box>
        )}
        {micIsWorking ? (
          <Box sx={styleImageButton}>
            <MicrophoneIcon color="white" />
          </Box>
        ) : (
          <Box
            sx={{
              ...styleImageButton,
              color: "red",
            }}
          >
            <MicOff />
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}

export { Icons };
