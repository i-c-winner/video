import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import { styles } from "../styles/styles";
import { useTranslation } from "react-i18next";
import { getInputStyles } from "../../features/styles/getInputStyles";
import { MicrophoneIcon, VideoCameraIcon, VideoCameraSlashIcon } from "@heroicons/react/24/outline";
import { MicOff } from "@mui/icons-material";
import { app } from "../../app/model/constants/app";
import { useNavigate } from "react-router-dom";

function CreateDisplayName() {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [cameraIsWorking, setcameraIsWorking] = useState<boolean>(true);
  const [microphoneIsWorking, setMicrophoneIsWorking] = useState<boolean>(true);
  const actions = {
    videoChange: () => {
      app.startingParameters.cameraIsWorking = !app.startingParameters.cameraIsWorking;
      setcameraIsWorking(!cameraIsWorking);
    },
    audioChange: () => {
      app.startingParameters.microphoneIsWorking = !app.startingParameters.microphoneIsWorking;
      setMicrophoneIsWorking(!microphoneIsWorking);
    }
  };
  const buttonText: any = "interface.buttons.createDisplayName";

  function action(event: BaseSyntheticEvent) {
    app.displayName = event.target.value;
  }

  function goPage() {
    app.appCreated = true;
    navigate(`/${app.roomName}`);
  }

  useEffect(() => {
    function handlerKey() {
      goPage();
    }

    window.addEventListener("keydown", handlerKey);
    return () => {
      window.removeEventListener("keydown", handlerKey);
    };
  });
  return <Box sx={styles.wrapper}>
    <Input placeholder="input yourName" onChange={action} sx={getInputStyles()}/>
    <Button onClick={goPage}>
      <Typography variant="myText">{t(buttonText)}</Typography>
    </Button>
    <Box sx={{
      display: "flex", justifyContent: "center",
      marginTop: "10px",
    }}>
      <Box onClick={actions.videoChange}
           sx={
             {
               width: "25px",
               height: "25px",
               marginRight: "10px"
             }
           }>{cameraIsWorking ? <VideoCameraIcon color={"green"}/> :
        <VideoCameraSlashIcon color="red"/>}
      </Box>
      <Box onClick={actions.audioChange}
           sx={
             {
               width: "25px",
               height: "25px"
             }
           }>{microphoneIsWorking ? <MicrophoneIcon color={"green"}/> :
        <Box sx={{color: "red"}}><MicOff/></Box>}
      </Box>
    </Box>
  </Box>;
}

export { CreateDisplayName };
