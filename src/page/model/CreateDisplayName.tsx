import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Box, Button, Input, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { useTranslation } from 'react-i18next';
import { IStore } from '../../app/types';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudio, changeVideo } from '../../app/store/interfaceSlice';
import { config } from '../../shared/config';
import { getInputStyles } from '../../features/styles/getInputStyles';
import { MicrophoneIcon, VideoCameraIcon, VideoCameraSlashIcon } from '@heroicons/react/24/outline';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import { MicOff } from '@mui/icons-material';
import { app } from '../../app/model/constants/app';
import { useNavigate } from 'react-router-dom';

function CreateDisplayName() {
    const {audio, video} = useSelector((state: IStore) => state.interface.conference.quality)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const [cameraIsWorking, setcameraIsWorking]=useState<boolean>(true)
    const [microphoneIsWorking, setMicrophoneIsWorking]= useState<boolean>(true)
    const actions = {
        videoChange: () => {
            app.params.cameraIsWorking=!app.params.cameraIsWorking
            setcameraIsWorking(!cameraIsWorking)
        },
        audioChange: () => {
            app.params.microphoneIsWorking=!app.params.microphoneIsWorking
            setMicrophoneIsWorking(!microphoneIsWorking)
        }
    };

    function action(event: BaseSyntheticEvent) {
        app.displayName = event.target.value
    }
    function goPage() {
        app.appCreated = true
        navigate(`/${ app.roomName }`)
    }
    return <Box sx={ styles.wrapper }>
        <Input placeholder="input yourName" onChange={ action } sx={ getInputStyles() }/>
        <Button onClick={ goPage }>
            <Typography variant="myText">{ t('interface.buttons.createDisplayName') }</Typography>
        </Button>
        <Box sx={ {
            display: 'flex', justifyContent: 'center',
            marginTop: '10px',
        } }>
            <ButtonWrapper action={ actions.videoChange }>{ cameraIsWorking? <VideoCameraIcon/> :
                <VideoCameraSlashIcon color="red"/> }
            </ButtonWrapper>
            <ButtonWrapper action={ actions.audioChange }>{ microphoneIsWorking ? <MicrophoneIcon/> :
                <Box sx={ {color: 'red'} }><MicOff/></Box> }
            </ButtonWrapper>
        </Box>
    </Box>;
}

export { CreateDisplayName };
