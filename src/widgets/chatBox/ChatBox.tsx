import { Box, Button } from '@mui/material';
import {useState, useEffect} from 'react';
import { ChatCard } from '../../entities/chatCard/ChatCard';
import { useRef } from 'react';

function ChatBox(props: { chatBoxVisible: boolean }) {
  const [text, setText]= useState<string>('kkk')
  const refText=useRef<HTMLDivElement>(null)
  function changeText(event: any) {
    setText(event.target.value)
  }
  function sendText() {
    setText('')
  }
    return props.chatBoxVisible ? <Box sx={
      {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        paddingBottom: '10px',
        width: '250px',
        backgroundColor: 'background.paper',
        paddingTop: '85px'
      }
    }
    >
      <Box>
        <ChatCard/>
        <ChatCard/>
      </Box>
      <Box>
<textarea className="textarea textarea_chat-box" value={text}  onChange={changeText}/>
        <Button onClick={sendText} variant="contained">Send</Button>
      </Box>
    </Box> : null;
}

export { ChatBox };
