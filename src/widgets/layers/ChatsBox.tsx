import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { Chat } from '../../entity/model/Chat';
import { getRandomText } from '../../features/plugins/getRandomText';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { ChatInputField } from '../../entity/model/ChatInputField';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

function ChatsBox() {
  const { chatsBoxVisible, toolboxVisible } = useSelector((state: IStore) => state.interface);
  const { chatsList } = useSelector((state: IStore) => state.chats);

  function openSettings() {
    console.log('open');
  }

  {
    return chatsBoxVisible && <Box sx={styles.chatsboxLayer}>
      <Box sx={styles.chatsboxLayer.chatsbox}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'white',
            boxSizing: 'border-box'
          }}
        >
          <Typography>Chat</Typography>
          <ButtonWrapper action={openSettings}>
            <AdjustmentsHorizontalIcon/>
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
