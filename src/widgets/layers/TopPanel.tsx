import { Box, CardHeader, Typography, Card, useTheme } from '@mui/material';
import { styles } from '../styles/styles';
import { glagol } from '../../entity/conference/glagol';
import { useTranslation } from 'react-i18next';
import { iconLogo } from '../../shared/img/svg';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';
import { SunIcon, AdjustmentsVerticalIcon, MoonIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import { useDispatch } from 'react-redux';
import { openModal, changeTypeModal } from '../../app/store/interfaceSlice';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import { ThemeContext } from '../../app/model/App';

const sizes = {
  width: '50px',
  height: '50px',
  viewBox: '-4 0 40 40'
};

function TopPanel() {
  const theme=useTheme()
  const themeContext=useContext(ThemeContext)
  console.log(themeContext, theme)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate=useNavigate()

  function exit() {
    glagol.peerConnection.close();
    navigate('/exit')
  }

  function changeTheme() {
themeContext.toggleTheme()
  }

  function openSettings() {
    dispatch(changeTypeModal('settings'));
    dispatch(openModal(true));
  }


  return (
    <Box sx={styles.topPanelLayer}>
      <CreateSvgIcon sizes={sizes} styles={styles.topPanelLayer.logo} icon={iconLogo}></CreateSvgIcon>
      <Box sx={styles.topPanelLayer.panel}>
        <CardHeader
          title={t('interface.room')}
          subheader={<Typography sx={{
            color: 'grey'
          }}>{glagol.params.roomName}</Typography>}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <ButtonWrapper action={changeTheme}>{theme.palette.mode==='dark'?<SunIcon/>:<MoonIcon />}</ButtonWrapper>
          <ButtonWrapper action={openSettings}><AdjustmentsVerticalIcon/></ButtonWrapper>
          <ButtonWrapper action={exit}><ArrowTopRightOnSquareIcon/></ButtonWrapper>
        </Box>
      </Box>

    </Box>
  );
}

export { TopPanel };
