import { Box, Button, TextField } from '@mui/material';
import * as React from 'react';
import { styleButton } from '../styles/styles';
import {useTranslation} from 'react-i18next';

const styleInput = {
  color: 'white',
  borderRadius: '8px',
  background: '#181818'
};

function Profile() {
const {t}=useTranslation()
  return (
    <Box sx={{
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between',
      height: '220px'
    }
    }>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '50px',
        pointerEvents: 'initial'
      }}>
        <TextField sx={styleInput} classes={{
          root: 'input_profile'
        }} label= {t("modal.settings.yourName")}/>
        <TextField sx={styleInput} classes={{
          root: 'input_profile'
        }} label={t('modal.settings.yourEmail')}/>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Button sx = {styleButton}>{t('interface.buttons.close')}</Button>
        <Button sx = {styleButton} variant="outlined">{t('interface.buttons.saveAndClose')}</Button>
      </Box>
    </Box>

  );
}

export { Profile };
