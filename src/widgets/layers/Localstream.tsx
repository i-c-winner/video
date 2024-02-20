import React, { ForwardedRef, useEffect, useRef, useState } from 'react';
import { RemoteStreamsBox } from './RemoteStreamsBox';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { glagol } from '../../entity/conference/glagol';
import { BadgeAvatars } from '../../entity/model/avatar/BadgeAvatar';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import { getRandomText } from '../../features/plugins/getRandomText';
import { app } from '../../app/model/constants/app';

function LocalStream() {
    const [remoteStreams, setRemoteStreams]=useState<MediaStream[]>([])
    const glagolVC = app.glagolVC
    function addTrack(...args: any[]) {
        console.log(args[0])
        console.log(remoteStreams)
        setRemoteStreams(prevRemotestream=> {
            return prevRemotestream.concat(args[0])
            // if (prevRemotestream.length===0) {
            //     return [args[0]]
            // } return prevRemotestream
        })
        console.log(remoteStreams)
    }

    useEffect(() => {
        glagolVC.setHandler('addTrack', addTrack)
    }, [])
    return <Box sx={
        styles.localeStyleLayer
    }>
        <RemoteStreamsBox streams={remoteStreams}/>
        <Box
            sx={ {position: 'relative', width: '100%'} }>
            { <Box sx={ {
                position: 'absolute',
                width: '100%', paddingTop: '10vh'
            } }><BadgeAvatars
                styles={ {color: 'green'} }
                sizes={ {width: 200, height: 200} }/></Box> }
            { <Box
                key={ getRandomText(5) }
                sx={ {
                    position: 'absolute',
                    color: 'red',
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                } }
            ><ButtonWrapper action={ () => {
            } }><ExclamationCircleIcon color="red"/></ButtonWrapper><Typography>Отсутсвует соединение с
                сервером</Typography></Box> }
            {/*<video className="video video_local" ref={refVideo} autoPlay={true}/>*/ }
        </Box>;
    </Box>;


};
export { LocalStream };
