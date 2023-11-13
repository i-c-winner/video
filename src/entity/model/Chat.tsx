import { Box } from '@mui/material';
import '../styles/index.scss'
import { TChat } from '../../app/types';

function Chat(props: {chat: TChat}) {

  return (
    <Box className="chat">
      <p>{props.chat.author}</p>
      <p>{props.chat.text}</p>
    </Box>
  );
}

export { Chat };
