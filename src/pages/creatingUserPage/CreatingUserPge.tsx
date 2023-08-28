import { useEffect, useRef, useState } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
import { glagol } from "../../entities/glagol/glagol";
import {RoomPage} from "../index";
import { getRandomText } from "../../shared/lib/getRandomText";
import '../styles/index.scss'

function CreatingUserPage() {
  const url = window.location.pathname.split('/')[1]
  const refVideo = useRef<any>(null)
  const stateValue = () => {
    if (url !== "") {
      glagol.roomName = url
      return "createName"
    }
    return "createRoom"
  }
  const [ text, setText ] = useState<"createName" | "createRoom"|"Room">(stateValue())

  function getTextButton() {
    return text === "createName" ? "Create NAme" : "Create ROom"
  }

  const refInput = useRef<any>("")

  function action() {
    if (text === "createRoom") {
      if (refInput.current.value==="") {
        glagol.roomName=getRandomText(5)
      } else {
        glagol.roomName = refInput.current.value
      }
      setText("createName")
    } else {
      glagol.userDisplayName = refInput.current.value
      glagol.userNode=getRandomText(8)
      setText("Room")

    }
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream: MediaStream) => {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.kind === "video") {
          if (refVideo.current !== null) refVideo.current.srcObject = stream
        }
      })
    })
  }, [])

   {return  text!=="Room"?  <Box display="flex" justifyContent="space-between" width="650px" mx="auto" mt="300px">
      <Box width="300px">
        <TextField
          inputRef={refInput}
          sx={{
            backgroundColor: "background.paper"
          }}
        />
        <Button onClick={action}>{getTextButton()}</Button>
      </Box>
      <Box width="300px">
        <video className="video" autoPlay={true} ref={refVideo}/>
      </Box>
    </Box>: <RoomPage /> }
}

export { CreatingUserPage }
