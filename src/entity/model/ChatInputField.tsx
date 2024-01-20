import { Box, Button, TextField } from '@mui/material';
import { styles } from '../../widgets/styles/styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { chat } from '../../features/manager/chat';
import { glagol } from '../conference/glagol';
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';
import { IStore } from '../../app/types';
import { saveChat } from '../../features/chats/saveChat';
import { styleButton } from '../styles/styles';
import { ButtonWrapper } from './UI/button/ButtonWrapper';


function ChatInputField() {
  const [ text, setText ] = useState<string>('');
  const dispatch = useDispatch();
  const { chatsList } = useSelector((state: IStore) => state.chats);

  function sendMessage() {
    setText('');
    if (refInput.current?.value) {
      chat.sendMessage(glagol.sendMessage, refInput.current?.value);
    }
  }

  function changeText(event: any) {
    setText(event.target.value);
  }

  function saveMessages() {
    saveChat(chatsList);
  }

  const refInput = useRef<HTMLTextAreaElement>(null);
  return (
    <Box sx={styles.chatsboxLayer.chatInputField}>
      <Box sx={{ boxSizing: 'border-box' }} display="flex" justifyContent="space-between" width="100%">
        <Box>
          <ButtonWrapper action={saveMessages}>{<ArrowDownTrayIcon/>}</ButtonWrapper>
        </Box>
        <TextField
          hiddenLabel={true}
          classes={{
            root: 'input-field'
          }}
          onChange={changeText}
          value={text}
          inputRef={refInput}
          id="standard-multiline-flexible"
          multiline
          color="primary"
          maxRows={4}
          variant="standard"
        />
        <ButtonWrapper action={sendMessage}>{<PaperAirplaneIcon />}</ButtonWrapper>
      </Box>


    </Box>
  );
}

export { ChatInputField };
