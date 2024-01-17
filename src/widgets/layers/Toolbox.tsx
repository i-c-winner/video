import { Box } from '@mui/material';
import { ModalWindow } from '../modal/ModalWindow';
import { styles } from '../styles/styles';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  FolderPlusIcon,
  ShareIcon,
  ArrowsPointingOutIcon,
  StopCircleIcon
} from '@heroicons/react/16/solid';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import { changeChatsBox } from '../../app/store/interfaceSlice';
import {toggleTileMode} from '../../app/store/interfaceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';
import {changeIsRecording} from '../../app/store/interfaceSlice';
import { useEffect } from 'react';
import { Recording } from '../../features/manager/record';


let recording: Recording|null= null

function Toolbox() {
  const { chatsBoxVisible, tileMode, isRecording } = useSelector((state: IStore) => state.interface);
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
        action={openChat}>
        <FolderPlusIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text="share"
        action={()=>console.log(12)}>
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
    </Box>
  </Box>;
}

export { Toolbox };
