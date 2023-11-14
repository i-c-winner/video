import { Box, Button, TextField } from '@mui/material';
import {styles} from '../../widgets/styles/styles';
import { useEffect, useRef, useState } from 'react';
import {useDispatch} from 'react-redux';
import {addChat} from '../../app/store/chatsSlice';
import {chat} from '../../features/manager/chat';
import { glagol } from '../../shared/conference/glagol';

interface IMessage {
  text: string,
  id: string,
  author: string
}

function ChatInputField() {
  const [text, setText]= useState<string>('')
  const dispatch= useDispatch()
  function sendMessage() {
    setText('')
    if (refInput.current?.value) chat.sendMessage(glagol.sendMessage, refInput.current?.value)
  }
  function changeText(event: any) {
   setText(event.target.value)
  }
  function messageReceived(message: IMessage) {
    dispatch(addChat(message))
  }
  useEffect(()=>{
    glagol.on('messageReceived', messageReceived)
  },[])
const refInput=useRef<HTMLTextAreaElement>(null)
  return (
    <Box sx={styles.chatsboxLayer.chatInputField}>
      <Box component='form'>
        <TextField
          onChange={changeText}
          value={text}
          inputRef={refInput}
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          variant="standard"
        />
      </Box>

      <Button onClick={sendMessage} variant="contained">Send</Button>
    </Box>
  );
}

export { ChatInputField };
