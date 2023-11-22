import React, { ForwardedRef, useState, useEffect } from 'react';
import { iconLogo } from '../../shared/img/svg';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { glagol } from '../../entity/conference/glagol';
import { config } from '../../shared/config';
import { getRandomText } from '../../features/plugins/getRandomText';

const LocalStream = React.forwardRef((props, ref: ForwardedRef<HTMLVideoElement>) => {
  const {chatsBoxVisible, tileMode}=useSelector((state: IStore)=>state.interface)
  const {remoteStreams}=useSelector((state:IStore)=>state.source)
  const { quality } = useSelector((state: IStore) => state.interface.conference);
  glagol.applyConstraints({ type: 'video', value: quality.video });
  glagol.applyConstraints({ type: 'audio', value: quality.audio });
  const sizes = {
    width: '100px',
    height: '100px',
    viewBox: '-4 0 40 40'
  };

  return <Box sx={
    styles.localeStyleLayer
  }>
    <CreateSvgIcon sizes={sizes} styles={styles.localeStyleLayer.logo} icon={iconLogo}></CreateSvgIcon>
    {chatsBoxVisible&&<Box key={getRandomText(5)} sx={{minWidth: config.boxes.chatsbox.width}}></Box>}
    <video className="video video_local" ref={ref} autoPlay={true}/>
    {remoteStreams.length>0&& !tileMode&& <Box key={getRandomText(5)} sx={{minWidth: config.boxes.remoteStreamBox.width}}/>}
  </Box>;

});
export { LocalStream };
