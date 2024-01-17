import { Box } from '@mui/material';
import { ModalWindow } from '../modal/ModalWindow';
import { styles } from '../styles/styles';
import { ChatBubbleOvalLeftEllipsisIcon, FolderPlusIcon } from '@heroicons/react/16/solid';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import { changeChatsBox } from '../../app/store/interfaceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';

function Toolbox() {
  const { chatsBoxVisible } = useSelector((state: IStore) => state.interface);
  const dispatch=useDispatch()

  function openChat() {
   dispatch(changeChatsBox(!chatsBoxVisible));
  }

  return <Box
    sx={styles.toolboxLayer}>
    <ModalWindow/>
    <Box sx={styles.toolboxLayer.toolbox}>
      <ButtonWrapper action={openChat}>
        <ChatBubbleOvalLeftEllipsisIcon/>
      </ButtonWrapper>
      <ButtonWrapper action={openChat}>
        <FolderPlusIcon/>
      </ButtonWrapper>
    </Box>

  </Box>;
}

export { Toolbox };
