import { Box, TextField } from '@mui/material';
const styleInput = {
  color: 'white',
  borderRadius: '8px',
  background: '#181818'
};

function Profile() {

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '50px',
      pointerEvents: 'initial'
    }}>
     <TextField  sx={styleInput} classes={{
       root: 'input_profile'
     }} label="Ваше имя"/>
     <TextField  sx={styleInput} classes={{
       root: 'input_profile'
     }} label="Ваша почта"/>
    </Box>
  );
}

export { Profile };
