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

function Toolbox() {
  const { chatsBoxVisible, tileMode, isRecording } = useSelector((state: IStore) => state.interface);
  const dispatch = useDispatch();

  function openChat() {
    dispatch(changeChatsBox(!chatsBoxVisible));
  }
  function togglingTileMode() {
    dispatch(toggleTileMode(!tileMode))
  }
  function recording () {
    dispatch(changeIsRecording(!isRecording))
  }


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
        text="share"
        action={openChat}>
        <FolderPlusIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text="share"
        action={openChat}>
        <ShareIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text="title"
        action={togglingTileMode}>
        <ArrowsPointingOutIcon/>
      </ButtonWrapper>
      <ButtonWrapper
        text={"record"}
        action={recording}>
        <StopCircleIcon/>
      </ButtonWrapper>
    </Box>

  </Box>;
}

export { Toolbox };
