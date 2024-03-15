import React, { useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { getRandomText } from '../../features/plugins/getRandomText';
import { openModal } from '../../app/store/interfaceSlice';
import { removeFile } from '../../app/store/filesSlice';
import { useTranslation } from 'react-i18next';
import { app } from "../../app/model/constants/app";

const File = React.forwardRef((props, ref) => {
  const {glagolVC} = app

  const dispatch = useDispatch()
  const {files} = useSelector((state: IStore) => state.files);
  const {t} = useTranslation()
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
    const filteredFiles = files.filter((file) => file.text === this.text);
    glagolVC.saveFile(filteredFiles, this.text)
  }

  function removingFile(fileForRemove: [string]) {
    dispatch(removeFile(fileForRemove[0]))
    dispatch(openModal(false))
  }

  function sendFile(event: any) {
    const params = {
      file_name: event.target.files[0].name,
      file_size: event.target.files[0].size,
      timestamp: new Date().toString()
    };
    glagolVC.sendFile({event, params})
    dispatch(openModal(false))
  }

  useEffect(() => {
    glagolVC.setHandler('removeFile', removingFile)
    return () => {
      /**
       * TODO removing sharing
       */
    }
  }, [])
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
      <Typography>{t('modal.files.load')}</Typography>
      <Button
        sx={{
          margin: '20px auto 30px'
        }}
        component="label" variant="contained" startIcon={<CloudUpload/>}>
        Upload file
        <VisuallyHiddenInput onChange={sendFile} type="file"/>
      </Button>
    </Box>
    <Box
      sx={{
        paddingTop: '10px'
      }}
    >
      <Typography>{t('modal.files.save')}</Typography>
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
