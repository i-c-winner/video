import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { Chat } from '../../entity/model/Chat';
import { getRandomText } from '../../features/plugins/getRandomText';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { ChatInputField } from '../../entity/model/ChatInputField';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { changeChatsBox } from '../../app/store/interfaceSlice';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

function ChatsBox() {
  const theme = useTheme();
  const [ colorText, setColorText ] = useState<'grey' | 'black'>('grey');
  const { chatsBoxVisible } = useSelector((state: IStore) => state.interface);
  const { chatsList } = useSelector((state: IStore) => state.chats);
  const dispatch = useDispatch();

  function openSettings() {
    dispatch(changeChatsBox(false));
  }

  useEffect(()=>{
    setColorText(theme.palette.mode==='dark'? 'grey': 'black')
  }, [theme])
  {
    return chatsBoxVisible && <Box sx={styles.chatsboxLayer}>
      <Box sx={styles.chatsboxLayer.chatsbox}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'white',
            boxSizing: 'border-box',
            alignItems: 'center'
          }}
        >
          <Typography variant="myText">Chat</Typography>
          <ButtonWrapper action={openSettings}>
            <XMarkIcon color={colorText}/>
          </ButtonWrapper>
        </Box>
        <Box sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexFlow: 'column',
          overflowY: 'hidden'
        }}>
          <div className="chats">
            {chatsList.map((chat: any) => {
              return <Chat key={getRandomText(5)} chat={chat}/>;
            })}
          </div>
          <ChatInputField/>
        </Box>
      </Box>
    </Box>;
  }
}

export { ChatsBox };
