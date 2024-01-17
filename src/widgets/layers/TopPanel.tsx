import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { glagol } from '../../entity/conference/glagol';
import { useTranslation } from 'react-i18next';
import {iconLogo} from '../../shared/img/svg';
import {CreateSvgIcon} from '../../features/CreaeteSvgIcon';


const sizes = {
  width: '50px',
  height: '50px',
  viewBox: '-4 0 40 40'
};
function TopPanel() {
  const { t } = useTranslation();
  return (
    <Box sx={styles.topPanelLayer}>
      <CreateSvgIcon sizes={sizes} styles={styles.topPanelLayer.logo} icon={iconLogo}></CreateSvgIcon>
      <Box sx={styles.topPanelLayer.panel}>
        <Typography color="white">{t('interface.room')}: </Typography><Typography color="white"
                                                                                  fontWeight="bold">&nbsp;&nbsp; {glagol.params.roomName}</Typography>
      </Box>
    </Box>
  );
}

export { TopPanel };
