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

function LocalStream(props: {
  stream: MediaStream
  littleScreenStream: MediaStream,
  connected: boolean
}) {

  const { video } = useSelector((state: IStore) => state.interface.conference.quality);
  const { quality } = useSelector((state: IStore) => state.interface.conference);
  const refVideo = useRef<HTMLVideoElement>(null);
  glagol.applyConstraints({ type: 'video', value: quality.video });
  glagol.applyConstraints({ type: 'audio', value: quality.audio });
  useEffect(() => {
    if (refVideo.current !== null) refVideo.current.srcObject = props.stream;
  },[]);

  return <Box sx={
    styles.localeStyleLayer
  }>
    <RemoteStreamsBox stream={props.littleScreenStream}/>
    <Box
      sx={{ position: 'relative', width: '100%' }}>
      {video === 'disabled' && <Box sx={{
        position: 'absolute',
        width: '100%', paddingTop: '10vh'
      }}><BadgeAvatars
        styles={{ color: 'green' }}
        sizes={{ width: 200, height: 200 }}/></Box>}
      {!props.connected && <Box
        key={getRandomText(5)}
        sx={{
          position: 'absolute',
          color: "red",
          display: "flex",
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      ><ButtonWrapper action={() => {
      }}><ExclamationCircleIcon color="red"/></ButtonWrapper><Typography>Отсутсвует соединение с
        сервером</Typography></Box>}
      <video className="video video_local" ref={refVideo} autoPlay={true}/>
    </Box>;
  </Box>;


};
export { LocalStream };
