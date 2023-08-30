import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
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
      glagol.userDisplayName = refInput.current.value;
      glagol.userNode = getRandomText(8);
      setText("Room");

    }
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream: MediaStream) => {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.kind === "video") {
          if (refVideo.current !== null) refVideo.current.srcObject = stream;
        }
      });
    });
  }, []);

  {
    return text !== "Room" ? <Box display="flex" justifyContent="space-between" width="650px" mx="auto" mt="300px">
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
          paddingTop: "25px",
          alignItems: "center",
          backgroundColor: 'background.default',
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
          inputProps={{
            className: "myInput"
          }}
          inputRef={refInput}
          sx={{
            padding: "0",
            color: "black"
            // backgroundColor: "background.paper"
          }}
        />
        <Box>
          <CreateSvgIcon styles={stylesSvgButton} attributes={iconCamera.attributes} content={iconCamera.content}/>
          <CreateSvgIcon styles={stylesSvgButton} attributes={iconMicrophone.attributes}
                         content={iconMicrophone.content}/>
        </Box>
        <Button sx={{ marginTop: "15px" }} variant="contained" onClick={action}>{getTextButton()}</Button>
      </Box>
      <Box width="300px">
        <video className="video" autoPlay={true} ref={refVideo}/>
      </Box>
    </Box> : <RoomPage/>;
  }
}

export { CreatingUserPage };
