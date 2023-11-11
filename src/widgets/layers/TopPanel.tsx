import { Box } from '@mui/material';
import { styles } from '../styles/styles';

function TopPanel() {

  return (
    <Box sx={styles.topPanel} onClick={()=>console.log('click TOP panel')} className="">TopPanel</Box>
  );
}

export { TopPanel };
