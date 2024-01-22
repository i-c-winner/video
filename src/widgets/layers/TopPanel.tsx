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
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../app/model/App';


const sizes = {
  width: '50px',
  height: '50px',
  viewBox: '-4 0 40 40'
};

function TopPanel() {
  const [colorText, setColorText]=useState('grey')
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function exit() {
    glagol.peerConnection.close();
    navigate('/exit');
  }

  function changeTheme() {
    themeContext.toggleTheme();
  }

  function openSettings() {
    dispatch(changeTypeModal('settings'));
    dispatch(openModal(true));
  }

  useEffect(() => {
    setColorText(() => {
      return theme.palette.mode === 'dark' ? 'grey' : 'black';
    });
  }, );


  return (
    <Box sx={styles.topPanelLayer}>
      <CreateSvgIcon sizes={sizes} styles={styles.topPanelLayer.logo} icon={iconLogo}></CreateSvgIcon>
      <Box sx={{
        ...styles.topPanelLayer.panel,
        color: colorText
      }}>
        <CardHeader
          title={t('interface.room')}
          subheader={<Typography
            variant='myText'
            sx={{
            }}>{glagol.params.roomName}</Typography>}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            color: colorText
          }}
        >
          <ButtonWrapper action={changeTheme}>{theme.palette.mode === 'dark' ? <SunIcon  color={colorText}/> : <MoonIcon  color={colorText}/>}</ButtonWrapper>
          <ButtonWrapper action={openSettings}><AdjustmentsVerticalIcon color={colorText}/></ButtonWrapper>
          <ButtonWrapper action={exit}><ArrowTopRightOnSquareIcon  color={colorText}/></ButtonWrapper>
        </Box>
      </Box>

    </Box>
  );
}

export { TopPanel };
