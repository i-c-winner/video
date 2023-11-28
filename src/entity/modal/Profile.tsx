import { Box, Button, TextField } from '@mui/material';
import * as React from 'react';

const styleInput = {
  color: 'white',
  borderRadius: '8px',
  background: '#181818'
};

function Profile() {

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
        }} label="Ваше имя"/>
        <TextField sx={styleInput} classes={{
          root: 'input_profile'
        }} label="Ваша почта"/>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Button>close</Button>
        <Button variant="outlined">Сохранить и закрыть</Button>
      </Box>
    </Box>

  );
}

export { Profile };
