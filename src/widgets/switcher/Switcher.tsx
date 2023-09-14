import { Box, Typography } from '@mui/material';

function Switcher(props: any) {
  function getStyles() {
    const baseStyle={
      position: 'absolute',
      width: '12px',
      borderRadius: '50px',
      height: '12px',
      top: '1px',
      border: '1px solid'
    }
    if (props.value===props.label) {
      return {
        ...baseStyle,
        backgroundColor: 'red',
        right: '2px'
      }
    } return {
      ...baseStyle,
      backgroundColor: 'grey',
      left: '2px'
    }
  }
  return (
    <Box sx={{
      display: 'flex'
    }}>
      <Box
        sx={{
          width: '50px',
          height: '16px',
          borderRadius: '8px',
          backgroundColor: 'background.paper',
          position: 'relative'
        }}>
        <Box
        sx={getStyles()}
        >

        </Box>
      </Box>
      <Typography ml="10px">label</Typography>
    </Box>

  );
}

export { Switcher };
