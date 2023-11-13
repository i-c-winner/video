import { Box, Button, TextField } from '@mui/material';
import {styles} from '../../widgets/styles/styles';
import { useRef, useState } from 'react';
import {useDispatch} from 'react-redux';
import {addChat} from '../../app/store/chatsSlice';

function ChatInputField() {
  const [text, setText]= useState<string>('')
  const dispatch= useDispatch()
  function sendMessage() {
    console.log(refInput.current?.value)
    dispatch(addChat({
      text: refInput.current?.value||'text ',
      author: 'I AM ',
      id: 'dd'
    }))
    setText('')
  }
  function changeText(event: any) {
   setText(event.target.value)
  }
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
