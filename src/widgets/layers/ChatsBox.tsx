import { Box } from '@mui/material';
import { styles } from '../styles/styles';

function ChatsBox() {

  return (
    <Box sx={styles.chatsbox} onClick={()=>console.log('chatsBOX')} className="">ChatsBox</Box>
  );
}

export { ChatsBox };
