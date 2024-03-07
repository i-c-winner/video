import React, { BaseSyntheticEvent, useState } from 'react';
import { Box, Button, Input, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { useTranslation } from 'react-i18next';
import { IStore } from '../../app/types';
import { useDispatch, useSelector } from 'react-redux';
import { getInputStyles } from '../../features/styles/getInputStyles';
import { MicrophoneIcon, VideoCameraIcon, VideoCameraSlashIcon } from '@heroicons/react/24/outline';
import { MicOff } from '@mui/icons-material';
import { app } from '../../app/model/constants/app';
import { useNavigate } from 'react-router-dom';

function CreateDisplayName() {
  const {audio, video} = useSelector((state: IStore) => state.interface.conference.quality)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const [cameraIsWorking, setcameraIsWorking] = useState<boolean>(true)
  const [microphoneIsWorking, setMicrophoneIsWorking] = useState<boolean>(true)
  const actions = {
    videoChange: () => {
      app.startingParameters.cameraIsWorking = !app.startingParameters.cameraIsWorking
      setcameraIsWorking(!cameraIsWorking)
    },
    // audioChange: () => {
    //     app.params.microphoneIsWorking=!app.params.microphoneIsWorking
    //     setMicrophoneIsWorking(!microphoneIsWorking)
    // }
  };

  function action(event: BaseSyntheticEvent) {
    app.displayName = event.target.value
  }

  function goPage() {
    app.appCreated = true
    navigate(`/${app.roomName}`)
  }

  return <Box sx={styles.wrapper}>
    <Input placeholder="input yourName" onChange={action} sx={getInputStyles()}/>
    <Button onClick={goPage}>
      <Typography variant="myText">{t('interface.buttons.createDisplayName')}</Typography>
    </Button>
    <Box sx={{
      display: 'flex', justifyContent: 'center',
      marginTop: '10px',
    }}>
      <Box onClick={actions.videoChange}
           sx={
             {
               width: '25px',
               height: '25px',
               marginRight: '10px'
             }
           }>{cameraIsWorking ? <VideoCameraIcon color={'green'}/> :
        <VideoCameraSlashIcon color="red"/>}
      </Box>
      <Box sx={
        {
          width: '25px',
          height: '25px'
        }
      }>{microphoneIsWorking ? <MicrophoneIcon/> :
        <Box sx={{color: 'red'}}><MicOff/></Box>}
      </Box>
    </Box>
  </Box>;
}

export { CreateDisplayName };
