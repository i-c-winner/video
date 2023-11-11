import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import {Chat} from '../../entity/modele/Chat';
const list=[{
  author: 'Ivanov'
},
  {
    author: 'Petrov'
  },
  {
    author: 'Sidorov'
  }]
function ChatsBox() {

  return (
    <Box sx={styles.chatsboxLayer} onClick={()=>console.log('chatsBOX')} className="">
      {list.map((chat: any)=>{
      return  <Chat author={chat.author} />
      })}
    </Box>
  );
}

export { ChatsBox };
