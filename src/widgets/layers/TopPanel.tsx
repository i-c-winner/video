import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import {glagol} from '../../entity/conference/glagol';

function TopPanel() {

  return (
    <Box sx={styles.topPanelLayer}>
      <Box sx={styles.topPanelLayer.panel}>
        <Typography color="white">Room:      </Typography><Typography color="white" fontWeight="bold">&nbsp;&nbsp; {glagol.params.roomName}</Typography>
      </Box>
      </Box>
  );
}

export { TopPanel }
