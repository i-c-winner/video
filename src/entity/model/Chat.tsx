import { Box } from '@mui/material';
import '../styles/index.scss'
import { TChat } from '../../app/types';
import { glagol } from '../conference/glagol';

function Chat(props: {chat: TChat}) {
function getClasses() {
  console.log(glagol, props.chat)
  if (props.chat.id===glagol.params.userNode) {
    return 'chat chat_my'
  } return 'chat chat_other'
}
  return (
    <Box className={getClasses()}>
      <p>{props.chat.author}</p>
      <p>{props.chat.text}</p>
    </Box>
  );
}

export { Chat };
