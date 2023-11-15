import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import {glagol} from '../../shared/conference/glagol';

function TopPanel() {

  return (
    <Box sx={styles.topPanelLayer} >Room: {glagol.params.roomName}</Box>
  );
}

export { TopPanel };
