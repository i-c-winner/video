import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { glagol } from "../../entities/glagol/glagol";
import { RoomPage } from "../index";
import { getRandomText } from "../../shared/lib/getRandomText";
import { iconCamera, iconMicrophone } from "../../shared/img/svg";
import { CreateSvgIcon } from "../../widgets/createSvgIcon/CreateSvgIcon";
import { useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import '../styles/index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantityVideo, changeAudioStream } from '../../app/store/configSlice';


function CreatingUserPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const url = window.location.pathname.split('/')[1];
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ selectedType, setSelectedType ] = useState<'microphone' | 'camera'>('camera');
  const refVideo = useRef<any>(null);
  const { videoQuantity, audioStream } = useSelector((state: any) => state.config.conference);

  type TSelectedType = 'microphone' | 'camera'


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

  function stylesSvgButtonCamera() {
    return {
      ...stylesSvgButton,
      color: videoQuantity !== 'disabled' ? 'green' : 'red'
    };
  }

  function stylesSvgButtonMicrophone() {
    return {
      ...stylesSvgButton,
      color: audioStream ? 'green' : 'red'
    };
  }

  function Actions() {
    return <DialogActions>
      <Button onClick={switchOff} variant="contained">switch off</Button>
      <Button onClick={switchOn} variant="contained">switch on</Button>
    </DialogActions>;
  }

  function switchOn() {
    if (selectedType === 'camera') {
      dispatch(changeQuantityVideo('VIDEO_MIDDLE'));
    } else {
      dispatch(changeAudioStream(true));
    }
    setModalIsOpen(false);
  }

  function switchOff() {
    if (selectedType === 'camera') {
      dispatch(changeQuantityVideo('disabled'));
    } else {
      dispatch(changeAudioStream(false))
    }
    setModalIsOpen(false);
  }

  function getTextButton() {
    return text === "createName" ? t('buttons.createName') : t('buttons.createRoom');
  }

  const refInput = useRef<any>("");

  function action() {
    if (text === "createRoom") {
      if (refInput.current.value === "") {
        glagol.roomName = getRandomText(5);
      } else {
        glagol.roomName = refInput.current.value.toLowerCase();
      }
      setText("createName");
    } else {
      glagol.userDisplayName = refInput.current.value !== '' ? refInput.current.value : "I'm incognito";
      glagol.userNode = getRandomText(8);
      setText("Room");
    }
  }

  function getPlaceholder() {
    return text === "createName" ? t('UI.createPage.name') : t('UI.createPage.room');
  }

  function openingModal(this: { type: TSelectedType }) {
    setSelectedType(this.type);
    setModalIsOpen(true);
  }

  const DialogBox = (props: { type: TSelectedType }) => {
    return <Dialog
      open={modalIsOpen}
      onClose={closingModal}>
      <DialogTitle>
        <p>{props.type}</p>
      </DialogTitle>
      <Actions/>
    </Dialog>;
  };

  function closingModal() {
    setModalIsOpen(false);
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
  useEffect(() => {
    if (text !== 'Room') refInput.current.value = '';
  }, [ text ]);
  {
    return text !== "Room" ?
      <Box display="flex" justifyContent="space-between" width="650px" mx="auto" pt="300px">
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            paddingTop: "25px",
            alignItems: "center",
          }}
          width="300px">
          <TextField
            placeholder={getPlaceholder()}
            InputProps={{
              classes: {
                root: "input-box",
                input: "input-box_creating"
              }
            }}
            inputRef={refInput}
          />
          <Box>
            <Button onClick={openingModal.bind({ type: 'camera' })}
                    startIcon={<CreateSvgIcon
                      styles={stylesSvgButtonCamera()}
                      icon={iconCamera}
                  />}/>
            <Button onClick={openingModal.bind({ type: 'microphone' })}
                    startIcon={<CreateSvgIcon
                      styles={stylesSvgButtonMicrophone()}  icon={iconMicrophone} />}/>
          </Box>
          <Button sx={{ marginTop: "15px" }} variant="contained" onClick={action}>{getTextButton()}</Button>
          <DialogBox type={selectedType}/>
        </Box>
        <Box width="300px">
          <video className="video video__createscreen" autoPlay={true} ref={refVideo}/>
        </Box>
      </Box> : <RoomPage/>;
  }
}

export { CreatingUserPage };
