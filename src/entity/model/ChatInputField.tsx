import { Box, Button, TextField } from '@mui/material';
import { styles } from '../../widgets/styles/styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '../../app/store/chatsSlice';
import { chat } from '../../features/manager/chat';
import { glagol } from '../conference/glagol';
import { iconArrowSend } from '../../shared/img/svg';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';
import { IStore } from '../../app/types';
import { saveChat } from '../../features/chats/saveChat';
import { styleButton } from '../styles/styles';


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
      <Box>
        <Button sx={styleButton} onClick={saveMessages} variant="outlined">Save</Button>
      </Box>
      <Box sx={{ boxSizing: 'border-box' }} display="flex" justifyContent="space-between" width="100%">
        <TextField
          classes={{
            root: 'input-field'
          }}
          onChange={changeText}
          value={text}
          inputRef={refInput}
          id="standard-multiline-flexible"
          label="Ваше сообщение"
          multiline
          color="primary"
          maxRows={4}
          variant="standard"
        />
        <Button startIcon={<CreateSvgIcon sizes={{ height: '35px', width: '35px', viewBox: '0 -3 20 20' }}
                                          icon={iconArrowSend}/>} onClick={sendMessage} variant="text"/>
      </Box>


    </Box>
  );
}

export { ChatInputField };
