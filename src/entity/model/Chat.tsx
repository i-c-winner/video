import { Box } from '@mui/material';
import '../styles/index.scss'

function Chat(props: any) {

  return (
    <Box className="chat"><p>{props.author}</p></Box>
  );
}

export { Chat };
