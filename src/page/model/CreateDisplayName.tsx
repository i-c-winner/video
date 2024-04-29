import React, { BaseSyntheticEvent, KeyboardEvent, useEffect } from "react";
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

    const actions = {
        videoChange: () => {
            if (video !== 'disabled') {
                dispatch(changeVideo('disabled'));
            } else {
                dispatch(changeVideo(config.conference.quality.video));
            }
        },
        audioChange: () => {
            if (audio !== 'disabled') {
                dispatch(changeAudio('disabled'));
            } else {
                dispatch(changeAudio('enabled'));
            }
        }
    };

    function action(event: BaseSyntheticEvent) {
        app.displayName = event.target.value
    }
    function goPage() {
        app.appCreated = true
        navigate(`/${ app.roomName }`)
    }
    useEffect(() =>{
        const handleKey=(key:WindowEventMap["keydown"])=>{
            if (key.key==="Enter") goPage()
        }
        window.addEventListener('keydown', handleKey)
        return() =>{
            window.removeEventListener('keydown', handleKey)
        }
    }, [])
    const buttonText: any='interface.buttons.createDisplayName'
    return <Box sx={ styles.wrapper }>
        <Input placeholder="input yourName" onChange={ action } sx={ getInputStyles() }/>
        <Button onClick={ goPage }>
            <Typography variant="myText">{ t(buttonText) }</Typography>
        </Button>
        <Box sx={ {
            display: 'flex', justifyContent: 'center',
            marginTop: '10px',
        } }>
            <ButtonWrapper action={ actions.videoChange }>{ video !== 'disabled' ? <VideoCameraIcon/> :
                <VideoCameraSlashIcon color="red"/> }
            </ButtonWrapper>
            <ButtonWrapper action={ actions.audioChange }>{ audio !== 'disabled' ? <MicrophoneIcon/> :
                <Box sx={ {color: 'red'} }><MicOff/></Box> }
            </ButtonWrapper>
        </Box>
    </Box>;
}

export { CreateDisplayName };
