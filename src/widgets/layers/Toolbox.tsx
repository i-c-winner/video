import { Box } from '@mui/material';
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
import { changeChatsBox, changeTypeModal, openModal } from '../../app/store/interfaceSlice';
import {toggleTileMode} from '../../app/store/interfaceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { IInterface, IStore } from '../../app/types';
import {changeIsRecording} from '../../app/store/interfaceSlice';
import { useEffect, useState } from 'react';
import { Recording } from '../../features/manager/record';
import { sharing } from '../../entity/sharing';
import { addSharing } from '../../app/store/sourceSlice';


let recording: Recording|null= null

function Toolbox() {
  const [sharingState, setSharingState]= useState<boolean>(false)
  const { chatsBoxVisible, tileMode, isRecording, modalIsOpen } = useSelector((state: IStore) => state.interface);
  // const {sharing}=useSelector((state: IStore)=>state.sh)
  const dispatch = useDispatch();

  function openChat() {
    dispatch(changeChatsBox(!chatsBoxVisible));
  }
  function togglingTileMode() {
    dispatch(toggleTileMode(!tileMode))
  }
  function recordAction () {
    dispatch(changeIsRecording(!isRecording))
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
    sharing.stop();
  }
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
      recording?.stop()
    }
  }, [ isRecording ]);



  return <Box
    sx={styles.toolboxLayer}>
    <ModalWindow/>
    <Box sx={styles.toolboxLayer.toolbox}>
      <ButtonWrapper
        text="chat"
        action={openChat}>
        <ChatBubbleOvalLeftEllipsisIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text="file"
        action={openingModal.bind({type: 'file'})}>
        <FolderPlusIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text="share"
        action={sharingAction}>
        <ShareIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text="title"
        action={togglingTileMode}>
        <ArrowsPointingOutIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text={"record"}
        action={recordAction}>
        <StopCircleIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text={"mic"}
        action={recordAction}>
        <MicrophoneIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text={"camera"}
        action={recordAction}>
        <VideoCameraIcon/>
      </ButtonWrapper>
    </Box>
  </Box>;
}

export { Toolbox };
