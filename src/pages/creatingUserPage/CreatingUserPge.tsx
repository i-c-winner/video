import { useEffect, useRef, useState } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
import '../styles/index.scss'

function CreatingUserPage() {
  const refVideo = useRef<HTMLVideoElement>(null)
  const [ text, setText ] = useState<"createName" | "createRoom">('createRoom')
  const [ value, setValue ] = useState<string>('this value')

  function getTextButton() {
    return text === "createName" ? "Create NAme" : "Create ROom"
  }

  const refInput = useRef<any>("")

  function action() {
    if (text === "createRoom") {
      setText("createName")

    }
  }

  function changeInput(event: React.SyntheticEvent) {
    if (refInput.current !== null) setValue(refInput.current.value)
// console.log(event.target)
    setValue("")
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
  return (
    <Box display="flex" justifyContent="space-between" width="650px" mx="auto" mt="300px">
      <Box width="300px">
        <TextField
          sx={{
            backgroundColor: "primary.main"
          }}
        />
        <Button onClick={action}>{getTextButton()}</Button>
      </Box>
      <Box width="300px">
        <video className="video" autoPlay={true} ref={refVideo}/>
      </Box>
    </Box>
  )
}

export { CreatingUserPage }
