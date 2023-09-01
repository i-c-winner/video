import { Box } from '@mui/material';
import { roRO } from '@mui/material/locale';
import { ChatCard } from '../../entities/chatCard/ChatCard';

function ChatBox(props: { chatBoxVisible: boolean }) {
  {
    return props.chatBoxVisible ? <Box sx={
      {
        width: '250px',
        backgroundColor: 'background.paper',
        paddingTop: '85px'
      }
    }
    >
      <ChatCard/>
      <ChatCard/>

    </Box> : null;
  }
}

export { ChatBox };
