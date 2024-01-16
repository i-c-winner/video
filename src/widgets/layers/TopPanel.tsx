import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { glagol } from '../../entity/conference/glagol';
import { useTranslation } from 'react-i18next';

function TopPanel() {
  const { t } = useTranslation();
  return (
    <Box sx={styles.topPanelLayer}>
      <Box sx={styles.topPanelLayer.panel}>
        <Typography color="white">{t('interface.room')}: </Typography><Typography color="white"
                                                                                  fontWeight="bold">&nbsp;&nbsp; {glagol.params.roomName}</Typography>
      </Box>
    </Box>
  );
}

export { TopPanel };
