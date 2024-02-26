import React, { useEffect, useRef, useState } from 'react';
import { RemoteStreamsBox } from './RemoteStreamsBox';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { BadgeAvatars } from '../../entity/model/avatar/BadgeAvatar';
import { getRandomText } from '../../features/plugins/getRandomText';
import { app } from '../../app/model/constants/app';
import { BigScreen } from '../../entity/model/BigScreen';

function LocalStream() {
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([])
    const [on, setOn]= useState(false)
    const [stream, setStream]=useState<MediaStream>(new MediaStream)
    const refVideo=useRef<HTMLVideoElement>(null)
    const glagolVC = app.glagolVC

    function addTrack(...args: any[]) {
        setRemoteStreams(prevRemotestream => {
            return prevRemotestream.concat(args[0])
        })
    }
    function removeTrack(mediaStreams: [MediaStream]) {
        setRemoteStreams(prevRemoteStream=>{
            return prevRemoteStream.filter((element)=>{
                console.log(element, mediaStreams[0])
                return element!==mediaStreams[0]
            })
        })
    }
    function roomOn(mediaStream: [MediaStream]) {
        setStream(mediaStream[0])
        setOn(true)
    }
    function sendSharing(mediaStream: [MediaStream]) {
        if (refVideo.current) refVideo.current.srcObject=mediaStream[0]
        setStream(mediaStream[0])
        setOn(true)
    }
    function changeBigScreen(mediaStream: [MediaStream]) {
        setStream(mediaStream[0])
        setOn(true)
    }

    useEffect(() => {
        glagolVC.setHandler('sendSharing', sendSharing)
        glagolVC.setHandler('addTrack', addTrack)
        glagolVC.setHandler('roomOn', roomOn)
        glagolVC.setHandler('removeTrack', removeTrack)
        glagolVC.setHandler('changeBigScreen', changeBigScreen)
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
            </Box> }
            <BigScreen classes='video video_local' stream={stream} />
        </Box>;
    </Box>;


};
export { LocalStream };
