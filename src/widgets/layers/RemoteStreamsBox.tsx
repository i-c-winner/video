import { RemoteStream } from '../../entity/model/RemoteStream';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { IStore } from '../../app/types';
import { RemoteStreamsBoxTileMode } from '../RemoteStreamsBoxTileMode';
import { VideoCameraSlashIcon } from '@heroicons/react/20/solid';
import { VideoCameraIcon } from '@heroicons/react/24/solid';
import { MicOff } from '@mui/icons-material';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { ChartBarIcon } from '@heroicons/react/24/solid';
import { BadgeAvatars } from '../../entity/model/avatar/BadgeAvatar';
import { app } from '../../app/model/constants/app';
import myAvatar from '../../../public/images/face2.jpeg'
import { getRandomText } from '../../features/plugins/getRandomText';
import { BigScreen } from '../../entity/model/BigScreen';

const {remoteStreamLayer} = styles;
const styleImageButton = {
  height: '24px',
  width: '24px',
};

function RemoteStreamsBox(props: { streams: MediaStream[] }) {
  const {glagolVC} = app
  const [stream, setStream] = useState<MediaStream>(new MediaStream())
  const {tileMode} = useSelector((state: IStore) => state.interface);
  const [cameraIsWorking, setCameraIsWorking] = useState<boolean>(app.glagolVC.glagolManager.cameraIsWorking)
  const [micIsWorking, setMicIsWorking] = useState<boolean>(app.glagolVC.glagolManager.microphoneIsWorking)


  function roomOn(stream: [MediaStream]) {
    setStream(stream[0])
  }

  function changeBigScreen(stream: [MediaStream]) {
    setStream(stream[0])
  }

  function getStyles() {
    return Object.assign(remoteStreamLayer.wrapper, {
      display: 'flex',
      flexFlow: 'column',
    });
  }

  function getColor() {
    switch (app.glagolVC.glagolManager.currentCameraQuantity) {
      case 'low':
        return 'red';
      case 'middle':
        return 'yellow';
      case 'height':
        return 'green';
      default:
        return 'red';
    }
  }

  function cameraSwitchOff() {
    setCameraIsWorking(false)
  }

  function cameraSwitchOn() {
    setCameraIsWorking(true)
  }

  function microphoneSwitchOff() {
    setMicIsWorking(false)
  }

  function microphoneSwitchOn() {
    setMicIsWorking(true)
  }

  useEffect(() => {
    glagolVC.setHandler('roomOn', roomOn)
    glagolVC.setHandler('changeBigScreen', changeBigScreen)
    glagolVC.glagolManager.setHandler('cameraSwitchOff', cameraSwitchOff)
    glagolVC.glagolManager.setHandler('cameraSwitchOn', cameraSwitchOn)
    glagolVC.glagolManager.setHandler('microphoneSwitchOff', microphoneSwitchOff)
    glagolVC.glagolManager.setHandler('microphoneSwitchOn', microphoneSwitchOn)
  }, [])

  function getChildren() {
    if (!tileMode) {
      return <Box sx={remoteStreamLayer}>
        <Box sx={getStyles()}>
          <Box sx={{margin: '0 0 0 auto'}} position={'relative'}>
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
            <BigScreen key={getRandomText(5)} classes='video video_my-video' stream={stream}/>
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
                {cameraIsWorking ? <Box
                    sx={styleImageButton}
                  ><VideoCameraIcon color="white"/></Box> :
                  <Box sx={styleImageButton}><VideoCameraSlashIcon color="red"/></Box>}
                {micIsWorking ? <Box
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
                <Typography sx={remoteStreamLayer.wrapper.displayName}
                            color="white">{glagolVC.displayName}</Typography>
                <BadgeAvatars
                  avatar={myAvatar}
                  styles={{
                    color: 'blue',
                  }}/>
              </Box>

            </Box>
          </Box>
          {/*<Typography variant="myText" pt={4}>Количество участников: {remoteStreams.length / 2 + 1}</Typography>*/}
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
              return <RemoteStream key={stream.id} stream={stream}/>;
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
