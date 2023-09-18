import { Box, Typography } from '@mui/material';
interface IProps {
  state: string,
  currentState: string,
  isToggle: boolean,
  textIsToggle: string,
  text: string
}

function Switcher(props: IProps) {
  function getStyles() {
    const baseStyle={
      position: 'absolute',
      width: '12px',
      borderRadius: '50px',
      height: '12px',
      top: '1px',
      border: '1px solid'
    }
    if (props.state===props.currentState) {
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {props.isToggle?<Typography mr="10px">{props.textIsToggle}</Typography>:null}
      <Box
        sx={{
          width: '50px',
          height: '16px',
          borderRadius: '8px',
          backgroundColor: 'background.paper',
          position: 'relative',
        }}>
        <Box
        sx={getStyles()}
        >

        </Box>
      </Box>
      <Typography ml="10px">{props.text}</Typography>
    </Box>

  );
}

export { Switcher };
