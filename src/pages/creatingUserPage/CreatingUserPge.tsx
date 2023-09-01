import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { glagol } from "../../entities/glagol/glagol";
import { RoomPage } from "../index";
import { getRandomText } from "../../shared/lib/getRandomText";
import { iconCamera, iconMicrophone } from "../../shared/img/svg";
import { CreateSvgIcon } from "../../widgets/createSvgIcon/CreateSvgIcon";
import { useTheme } from "@mui/material";
import '../styles/index.scss';


function CreatingUserPage() {
  const theme = useTheme();
  const url = window.location.pathname.split('/')[1];
  const [ openVideo, setOpenVideo ] = useState<boolean>(false);
  const [ openAudio, setOpenAudio ] = useState<boolean>(false);
  const refVideo = useRef<any>(null);

  const stateValue = () => {
    if (url !== "") {
      glagol.roomName = url;
      return "createName";
    }
    return "createRoom";
  };
  const [ text, setText ] = useState<"createName" | "createRoom" | "Room">(stateValue());
  const stylesSvgButton = {
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "5px",
    margin: "10px"
  };

  function Actions() {
    return <DialogActions>
      <Button onClick={switchOff} variant="contained">switch off</Button>
      <Button onClick={switchOn} variant="contained">switch on</Button>
    </DialogActions>;
  }

  function switchOn() {
    setOpenAudio(false);
    setOpenVideo(false);
  }

  function switchOff() {
    setOpenAudio(false);
    setOpenVideo(false);
  }

  function getTextButton() {
    return text === "createName" ? "Create NAme" : "Create ROom";
  }

  const refInput = useRef<any>("");

  function action() {
    if (text === "createRoom") {
      if (refInput.current.value === "") {
        glagol.roomName = getRandomText(5);
      } else {
        glagol.roomName = refInput.current.value;
      }
      setText("createName");
    } else {
      glagol.userDisplayName = refInput.current.value!==''? refInput.current.value :"I'm incognito";
      glagol.userNode = getRandomText(8);
      setText("Room");

    }
  }

  function closeVideo() {
    setOpenVideo(false);
  }

  function closeAudio() {
    setOpenAudio(false);
  }

  function openingVideo() {
    setOpenVideo(true);
  }

  function openingAudio() {
    setOpenAudio(true);
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream: MediaStream) => {
      glagol.localStream = stream;
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.kind === "video") {
          if (refVideo.current !== null) refVideo.current.srcObject = stream;
        }
      });
    });
  }, []);

  {
    return text !== "Room" ? <Box display="flex" justifyContent="space-between" width="650px" mx="auto" pt="300px">
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
          paddingTop: "25px",
          alignItems: "center",
        }}
        width="300px">
        <TextField
          placeholder="Введите имя"
          InputProps={{
            classes: {
              root: "input-box",
              input: "input-box_creating"
            }
          }}
          inputRef={refInput}
        />
        <Box>
          <Button onClick={openingVideo}
                  startIcon={<CreateSvgIcon styles={stylesSvgButton} attributes={iconCamera.attributes}
                                            content={iconCamera.content}/>}/>
          <Dialog
            open={openVideo}
            onClose={closeVideo}>
            <DialogTitle>
              <p>Settings video</p>
            </DialogTitle>
            <Actions/>
          </Dialog>

          <Button onClick={openingAudio}
                  startIcon={<CreateSvgIcon styles={stylesSvgButton} attributes={iconMicrophone.attributes}
                                            content={iconMicrophone.content}/>}/>
        </Box>
        <Button sx={{ marginTop: "15px" }} variant="contained" onClick={action}>{getTextButton()}</Button>
        <Dialog
          open={openAudio}
          onClose={closeAudio}>
          <DialogTitle>
            <p>Settings video</p>
          </DialogTitle>
          <Actions/>
        </Dialog>
      </Box>
      <Box width="300px">
        <video className="video video__createscreen" autoPlay={true} ref={refVideo}/>
      </Box>
    </Box> : <RoomPage/>;
  }
}

export { CreatingUserPage };
