import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import {glagol} from '../../entity/conference/glagol';

function TopPanel() {

  return (
    <Box sx={styles.topPanelLayer}>Room: {glagol.params.roomName}</Box>
  );
}

export { TopPanel };
