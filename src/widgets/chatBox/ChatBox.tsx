import { Box } from '@mui/material';
import { roRO } from '@mui/material/locale';

function ChatBox(props: { chatBoxVisible: boolean }) {
  {
    return props.chatBoxVisible ? <Box sx={
      {
        width: '250px',
        backgroundColor: 'background.paper',
        paddingTop: '85px'
      }
    }
    >ChatBox</Box> : null;
  }
}

export { ChatBox };
