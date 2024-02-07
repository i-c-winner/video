import { Box, useTheme } from '@mui/material';
import { ModalWindow } from '../modal/ModalWindow';
import { styles } from '../styles/styles';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  FolderPlusIcon,
  ShareIcon,
  ArrowsPointingOutIcon,
  StopCircleIcon,
  MicrophoneIcon,
  VideoCameraIcon
} from '@heroicons/react/16/solid';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import { changeAudio, changeChatsBox, changeTypeModal, changeVideo, openModal } from '../../app/store/interfaceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { IInterface, IStore } from '../../app/types';
import { changeIsRecording } from '../../app/store/interfaceSlice';
import { useEffect, useState } from 'react';
import { Recording } from '../../features/manager/record';
import { sharing } from '../../entity/sharing';
import { addSharing } from '../../app/store/sourceSlice';
import { config } from '../../shared/config';
import { MicOff } from '@mui/icons-material';
import { VideoCameraSlashIcon } from '@heroicons/react/24/solid';

let recording: Recording | null = null;

function Toolbox() {
  const [ sharingState, setSharingState ] = useState<boolean>(false);
  const { chatsBoxVisible, tileMode, isRecording, modalIsOpen } = useSelector((state: IStore) => state.interface);
  const { audio, video } = useSelector((state: IStore) => state.interface.conference.quality);
  const dispatch = useDispatch();
  const [ colorText, setColorText ] = useState<'grey' | 'black'>('grey');
  const theme = useTheme();

  function openChat() {
    dispatch(changeChatsBox(!chatsBoxVisible));
  }

  function togglingTileMode() {
    /**
     * TODO  подключить плиточный режим
     */
    // dispatch(toggleTileMode(!tileMode));
  }

  function recordAction() {
    dispatch(changeIsRecording(!isRecording));
  }

  function sharingAction() {
    if (sharingState) {
      sharingStop();
      setSharingState(false);
    } else {
      sharingStart();
      setSharingState(true);
    }
  }

  function sharingStart() {
    sharing.start().then((stream) => {
      if (stream) {
        dispatch(addSharing({
          type: 'dashboard',
          id: stream.id
        }));
      } else {
        console.info('Sharing is aborting');
      }
    });
  }

  function openingModal(this: { type: IInterface['typeModal'] }) {
    dispatch(changeTypeModal(this.type));
    dispatch(openModal(!modalIsOpen));
  }

  function sharingStop() {
    dispatch(addSharing())
    sharing.stop();
  }

  function toggledCamera() {
    if (video !== 'disabled') {
      dispatch(changeVideo('disabled'));
    } else {
      dispatch(changeVideo(config.conference.quality.video));
    }
  }

  function toggledMicrophone() {
    if (audio === 'enabled') {
      dispatch(changeAudio('disabled'));
    } else {
      dispatch(changeAudio('enabled'));
    }
  }

  useEffect(() => {
    setColorText(() => {
      return theme.palette.mode === 'dark' ? 'grey' : 'black';
    });
  }, [ theme ]);

  useEffect(() => {
    if (isRecording) {
      const rec = new Recording();
      rec.init().then((result) => {
        rec.createRecorder(result);
        rec.createListeners();
        rec.start();
        recording = rec;
      }).catch((error) => {
        dispatch(changeIsRecording(false));
      });
    } else {
      recording?.stop();
    }
  }, [ isRecording ]);

  return <Box
    sx={styles.toolboxLayer}>
    <ModalWindow/>
    <Box sx={{
      ...styles.toolboxLayer.toolbox,
      color: colorText
    }}>
      <ButtonWrapper
        text="chat"
        action={openChat}>
        <ChatBubbleOvalLeftEllipsisIcon
          color={colorText}
        />
      </ButtonWrapper>
      <ButtonWrapper
        text="file"
        action={openingModal.bind({ type: 'file' })}>
        <FolderPlusIcon
          color={colorText}
        />
      </ButtonWrapper>
      <ButtonWrapper
        text="share"
        action={sharingAction}>
        <ShareIcon
          color={colorText}
        />
      </ButtonWrapper>
      {/*<ButtonWrapper*/}
      {/*  text="tile"*/}
      {/*  action={togglingTileMode}>*/}
      {/*  <ArrowsPointingOutIcon*/}
      {/*    color={colorText}*/}
      {/*  />*/}
      {/*</ButtonWrapper>*/}
      <ButtonWrapper
        text={"record"}
        action={recordAction}>
        <StopCircleIcon
          color={colorText}
        />
      </ButtonWrapper>
      <ButtonWrapper
        text={"mic"}
        action={toggledMicrophone}>
        {audio !== 'disabled' ? <MicrophoneIcon
          color={colorText}
        /> : <Box sx={{ color: 'white' }}><MicOff/></Box>}
      </ButtonWrapper>
      <ButtonWrapper
        text={"camera"}
        action={toggledCamera}>
        {video!=='disabled'?<VideoCameraIcon
          color={colorText}
        />:<VideoCameraSlashIcon color='white'/>}
      </ButtonWrapper>
    </Box>
  </Box>;
}

export { Toolbox };
