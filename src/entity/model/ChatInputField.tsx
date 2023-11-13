import { Box, Button, TextField } from '@mui/material';
import {styles} from '../../widgets/styles/styles';

function ChatInputField() {

  return (
    <Box sx={styles.chatsboxLayer.chatInputField}>
      <Box component='form'>
        <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          variant="standard"
        />
      </Box>

      <Button variant="contained">Send</Button>
    </Box>
  );
}

export { ChatInputField };
