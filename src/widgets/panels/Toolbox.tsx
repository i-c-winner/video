import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { iconChat, iconSettings, iconExit } from '../../shared/img/svg';
import { CreateSvgIcon } from '../createSvgIcon/CreateSvgIcon';

function Toolbox() {
  const [ visible, setVisible ] = useState<boolean>(true);
  const baseStyle = {
    backgroundColor: 'background.paper',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  };

  function getStyleToolbox() {
    if (visible) {
      return {
        ...baseStyle,
        bottom: '0px'
      };
    }
    return {
      ...baseStyle,
      bottom: '-50px'
    };
  }

  return (
    <Box sx={getStyleToolbox()}>
      <Button startIcon={<CreateSvgIcon attributes={iconChat.attributes} content={iconChat.content}/>}></Button>
      <Button startIcon={<CreateSvgIcon attributes={iconSettings.attributes} content={iconSettings.content}/>}></Button>
      <Button startIcon={<CreateSvgIcon attributes={iconExit.attributes} content={iconExit.content}/>}></Button>

    </Box>
  );
}

export { Toolbox };
