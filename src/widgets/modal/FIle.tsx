import React, { useRef } from 'react';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { getRandomText } from '../../features/plugins/getRandomText';
import { channel } from '../../entity/conference/channel';
import { glagol } from '../../entity/conference/glagol';

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

  function clickButton(this: { idRemote: string, text: string }) {
   const filteredFiles=  files.filter((file) => file.text === this.text);
    const message = new Strophe.Builder('message', {
      to: `${glagol.params.roomName}@conference.prosolen.net/focus`,
      type: 'chat'
    }).c('x', { xmlns: 'http://jabber.org/protocol/muc#user' }).up()
      .c('body', {}, "start_download")
      .c('jimble', {
        xmlns: 'urn:xmpp:jimble',
        ready: 'true'
      }).t(filteredFiles[0].text);
    const params = {
      file_name: JSON.parse(atob(filteredFiles[0].text)).file_name,
      file_size: JSON.parse(atob(filteredFiles[0].text)).file_size,
      timestamp: JSON.parse(atob(filteredFiles[0].text)).timestamp
    };
    channel.createFileDescriotion(params)
    glagol.sendMessage(message);
  }

  function sendFile(event: any) {
    const params = {
      file_name: event.target.files[0].name,
      file_size: event.target.files[0].size,
      timestamp: new Date().toString()
    };
    channel.createFileDescriotion(params);
    channel.send(JSON.stringify(params));
    channel.setCurrentFile(event.target.files[0]);
  }

  return <Box
    sx={
      {
        margin: '25vh auto auto',
        bgcolor: 'background.paper',
        minWidth: '500px',
        padding: '20px',
        textAlign: 'center',
        color: 'white'

      }
    }>
    <Box sx={{
      borderBottom: '2px solid white',
    }}>
      <Typography>Выберите файл для загрузки</Typography>
      <Button
        sx={{
          margin: '20px auto 30px'
        }}
        component="label" variant="contained" startIcon={<CloudUpload/>}>
        Upload file
        <VisuallyHiddenInput onChange={sendFile} type="file"/>
      </Button>
    </Box>
    <Box>
      <Typography>Выберите файл для сохранения</Typography>
      <List>
        {files.map((element) => {
          const file = JSON.parse(atob(element.text))
          return <ListItem
            sx={{
              width: 'initial',
              boxSizing: 'border-box',
              bgcolor: 'black',
              margin: '10px',
              '&:hover': {
                width: 'initial',
                color: 'black',
                bgcolor: 'white'
              }
            }}
            key={getRandomText(5)} component="div" disablePadding>
            <ListItemButton onClick={clickButton.bind(element)}>
              <ListItemText primary={file.file_name}/>
            </ListItemButton>
          </ListItem>
        })}
      </List>
    </Box>
  </Box>
});
export { File };
