import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { Chat } from '../../entity/model/Chat';
import { getRandomText } from '../../features/plugins/getRandomText';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';

function ChatsBox() {
  const  {chatsBoxVisible, toolboxVisible}  = useSelector((state: IStore) => state.interface);
  function getStyles() {
    if (toolboxVisible) {
     return {
       ...styles.chatsboxLayer.chatsbox,
       height: 'calc(100vh - 50px)'
     }
    }return {
      ...styles.chatsboxLayer.chatsbox,
      height: '100vh'
    }
  }

  const { chatsList } = useSelector((state: IStore) => state.chats);
  {return chatsBoxVisible && <Box sx={styles.chatsboxLayer}>
    <Box sx={getStyles()}>
      {chatsList.map((chat: any) => {
        return <Chat key={getRandomText(5)} chat={chat}/>;
      })}
    </Box>
  </Box>;
}
}

export { ChatsBox };
