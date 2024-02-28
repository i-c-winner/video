import { RemoteStream } from '../../entity/model/RemoteStream';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { glagol } from '../../entity/conference/glagol';
import { IStore } from '../../app/types';
import { RemoteStreamsBoxTileMode } from '../RemoteStreamsBoxTileMode';
import { VideoCameraSlashIcon } from '@heroicons/react/20/solid';
import { VideoCameraIcon } from '@heroicons/react/24/solid';
import { MicOff } from '@mui/icons-material';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { ChartBarIcon } from '@heroicons/react/24/solid';
import { BadgeAvatars } from '../../entity/model/avatar/BadgeAvatar';
import {app} from '../../app/model/constants/app';
import myAvatar from '../../../public/images/face2.jpeg'
import { getRandomText } from '../../features/plugins/getRandomText';
import { BigScreen } from '../../entity/model/BigScreen';

const { remoteStreamLayer } = styles;
const styleImageButton = {
  height: '24px',
  width: '24px',
};

function RemoteStreamsBox(props: {streams: MediaStream[]}) {
  const {glagolVC}= app
const [stream, setStream]= useState<MediaStream>(new MediaStream())
  const { video, audio } = useSelector((state: IStore) => state.interface.conference.quality);
  const refVideo = useRef<HTMLVideoElement>(null);
  const { tileMode } = useSelector((state: IStore) => state.interface);
  const { remoteStreams } = useSelector((state: IStore) => state.source);


  function roomOn(stream: [MediaStream]) {
   setStream(stream[0])
  }
  function changeBigScreen(stream: [MediaStream]){
    setStream(stream[0])
  }
  function getStyles() {
    return Object.assign(remoteStreamLayer.wrapper, {
      display: 'flex',
      flexFlow: 'column',
    });
  }

  function getColor() {
    switch (video) {
      case 'disabled':
      case 'low':
        return 'red';
      case 'middle':
        return 'yellow';
      case 'height':
        return 'green';
      default:
        return 'grey';
    }
  }

  useEffect(()=>{
    glagolVC.setHandler('roomOn', roomOn)
    glagolVC.setHandler('changeBigScreen', changeBigScreen)
  }, [])

  function getChildren() {
    if (!tileMode) {
      return <Box sx={remoteStreamLayer}>
        <Box sx={getStyles()}>
          <Box sx={{ margin: '0 0 0 auto' }} position={'relative'}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              position: 'absolute',
              top: '7px',
              padding: '2px',
              width: '95%',
              left: '5px'
            }}><Box sx={{
              ...styleImageButton,
              color: getColor()
            }}>
              <ChartBarIcon/>
            </Box></Box>
            <BigScreen key={getRandomText(5)} classes='video video_my-video' stream={stream} />
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: '7px',
              padding: '2px',
              width: '95%',
              left: '5px',
              alignItems: 'flex-end'
            }}>
              <Box sx={{
                display: 'flex',
                position: 'relative'
              }}>
                {video !== 'disabled' ? <Box
                    sx={styleImageButton}
                  ><VideoCameraIcon color="white"/></Box> :
                  <Box sx={styleImageButton}><VideoCameraSlashIcon color="red"/></Box>}
                {audio !== 'disabled' ? <Box
                    sx={styleImageButton}
                  ><MicrophoneIcon color="white"/></Box> :
                  <Box sx={{
                    ...styleImageButton,
                    color: 'red'
                  }}><MicOff/></Box>}
              </Box>
              <Box sx={{
                position: 'absolute'
              }}>
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                <Typography sx={remoteStreamLayer.wrapper.displayName} color="white">{glagolVC.displayName}</Typography>
                <BadgeAvatars
                  avatar={myAvatar}
                  styles={{
                  color: 'blue',
                }}/>
              </Box>

            </Box>
          </Box>
          <Typography variant="myText" pt={4}>Количество участников: {remoteStreams.length / 2 + 1}</Typography>
          <Box
            sx={
              {
                flexGrow: '1',
                pointerEvents: 'initial',
                height: 'calc(100vh - 536px)',
                overflowY: 'auto',
                overflowX: 'hidden'
              }
            }
          >
            {props.streams.map((stream) => {
              return <RemoteStream  key={stream.id} stream={stream}/>;
            })}
          </Box>
        </Box>
      </Box>;
    } else {
      return <RemoteStreamsBoxTileMode/>;
    }
  }
  return getChildren();
}

export { RemoteStreamsBox };
