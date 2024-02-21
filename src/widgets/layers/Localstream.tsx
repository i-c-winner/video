import React, { useEffect, useRef, useState } from 'react';
import { RemoteStreamsBox } from './RemoteStreamsBox';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { BadgeAvatars } from '../../entity/model/avatar/BadgeAvatar';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { getRandomText } from '../../features/plugins/getRandomText';
import { app } from '../../app/model/constants/app';
import * as stream from 'stream';

function LocalStream() {
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([])
    const [on, setOn]= useState(false)
    const refVideo=useRef<HTMLVideoElement>(null)
    const glagolVC = app.glagolVC
    glagolVC.setHandler('roomOn', roomOn)

    function addTrack(...args: any[]) {
        setRemoteStreams(prevRemotestream => {
            return prevRemotestream.concat(args[0])
        })
    }
    function roomOn(mediaStream: [MediaStream]) {
       if (refVideo.current) refVideo.current.srcObject=mediaStream[0]
        setOn(true)
    }
    useEffect(() => {
        glagolVC.setHandler('addTrack', addTrack)
        glagolVC.setHandler('roomOn', roomOn)
    }, [])
    return <Box sx={
        styles.localeStyleLayer
    }>
        <RemoteStreamsBox streams={ remoteStreams }/>
        <Box
            sx={ {position: 'relative', width: '100%'} }>
            {!on && <Box sx={ {
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
                    justifyContent: 'center',
                } }
            >
                {/*<Box sx={ {*/}
                {/*    height: '25px',*/}
                {/*    width: '25px',*/}
                {/*    display: 'flex',*/}
                {/*    marginRight: '10px'*/}
                {/*} }>*/}
                {/*    <ExclamationCircleIcon color="red"/>*/}
                {/*</Box>*/}
                {/*<Typography> Отсутсвует соединение с*/}
                {/*    сервером</Typography>*/}
            </Box> }
            <video className="video video_local" ref={refVideo} autoPlay={true}/>
        </Box>;
    </Box>;


};
export { LocalStream };
