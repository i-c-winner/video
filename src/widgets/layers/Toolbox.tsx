import { Box, Button } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';

function Toolbox() {
  function sharingStart() {
    sharing.start();
  }
  function sharingStop() {
    sharing.stop();
  }
  return <Box sx={styles.toolboxLayer}>
    <Box sx={styles.toolboxLayer.toolbox}>
      <Button variant="contained">Chat</Button>
      <Button variant="contained" onClick={sharingStart}>sharing</Button>
      <Button variant="contained" onClick={sharingStop}>stop</Button>
    </Box></Box>
}
export {Toolbox}
