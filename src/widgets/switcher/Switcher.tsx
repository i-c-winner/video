import { Box, Typography } from '@mui/material';

function Switcher(props: any) {
function getBackground() {
 return  props.label===props.value? 'red': 'green'
  }
  return (
    <Box sx={{
      display: 'flex'
    }}>
      <Box
        sx={{
          width: '100px',
          height: '26px',
          borderRadius: '13px',
          backgroundColor: getBackground()
        }}>
      </Box>
      <Typography ml="10px">label</Typography>
    </Box>

  );
}

export { Switcher };
