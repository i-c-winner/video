import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { Chat } from '../../entity/model/Chat';
import { getRandomText } from '../../features/plugins/getRandomText';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';

function ChatsBox() {
  const { chatsList } = useSelector((state: IStore) => state.chats);
  return (
    <Box sx={styles.chatsboxLayer} onClick={() => console.log('chatsBOX')} className="">
      {chatsList.map((chat: any) => {
        return <Chat key={getRandomText(5)} chat={chat}/>;
      })}
    </Box>
  );
}

export { ChatsBox };
