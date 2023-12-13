import React from 'react';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { getRandomText } from '../../features/plugins/getRandomText';

const File = React.forwardRef((props, ref) => {
  const { files } = useSelector((state: IStore) => state.files);
  const VisuallyHiddenInput = styled('input')({
    // clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  function clickButton(this: {type: string}) {
    console.log(this.type)
  }
  return <Box
    sx={
      {
        margin: '25vh auto auto',
        bgcolor: 'background.paper',
        minWidth: '500px',

      }
    }>
    <Box>
      <Typography>Выберите файл</Typography>
      <Button component="label" variant="contained" startIcon={<CloudUpload/>}>
        Upload file
        <VisuallyHiddenInput type="file"/>
      </Button>
    </Box>
    <Box>
      <List>
        {files.map((element) => {
          return <ListItem key={getRandomText(5)} component="div" disablePadding>
            <ListItemButton onClick={clickButton.bind({type: element.file})}>
              <ListItemText primary={`Item`}>{element.file}</ListItemText>
            </ListItemButton>;
          </ListItem>;
        })}
      </List>
    </Box>;
  </Box>
    ;
});
export { File };
;
