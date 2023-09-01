import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { ChatCard } from '../../entities/chatCard/ChatCard';
import { useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';
import { Xmpp } from '../../entities/conference/xmpp';
import { IChat } from '../../app/types';
import { useSelector } from 'react-redux';

const xmpp = new Xmpp();

function ChatBox(props: { chatBoxVisible: boolean }) {
  const chats  = useSelector((state: any) => state.chat);
  const [ text, setText ] = useState<string>('');
  const refText = useRef<any>(null);
  const refContainer = useRef<any>(null);

  function changeText(event: any) {
    setText(event.target.value);
  }

  function sendText() {
    const message = new Strophe.Builder('message', {
      from: `${glagol.userNode}@prosolen.net/${glagol.userNode}`,
      id: glagol.userNode,
      to: `${glagol.roomName}@conference.prosolen.net`,
      type: 'groupchat'
    }).c('body').t(text).up().c('jingle', {
      id: glagol.userNode,
      date: getDate(),
      authorName: glagol.userDisplayName,
    });

    function getDate() {
      function addZero(data: number) {
        if (data < 10) {
          return '0' + data;
        }
        return +data;
      }

      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const hour = time.getHours();
      const minute = time.getMinutes();
      return `${addZero(hour)}:${addZero(minute)}`;
    }

    setText('');
    xmpp.getConnection().send(message);
  }

  useEffect(() => {
    function listenerTextArea(event: any) {
      if (event.key === 'Escape') {
        refText.current.blur();
      }
    }

    if (refContainer.current !== null) {
      refText.current.addEventListener('keydown', listenerTextArea);
    }
    return () => {
      refText.current.removeEventListener('keydown', listenerTextArea);
    };
  }, [ props.chatBoxVisible ]);
  return props.chatBoxVisible ? <Box sx={
    {
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'flex-end',
      paddingBottom: '10px',
      width: '350px',
      backgroundColor: 'background.paper',
      paddingTop: '85px'
    }
  }
  >
    <Box
      sx={
        {
          // maxHeight: 'calc(100vh - 195px)',
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'auto'
        }
      }
      ref={refContainer}>
      {chats.map((chat: IChat, index: number) => {
        return <ChatCard key={index} chat={chat}/>;
      })}
    </Box>
    <Box sx={{
      height: '100px'
    }}>
      <textarea ref={refText} defaultValue="Введите сообщение" className="textarea textarea_chat-box" value={text} onChange={changeText}/>
      <Button onClick={sendText} variant="contained">Send</Button>
    </Box>
  </Box> : null;
}

export { ChatBox };
