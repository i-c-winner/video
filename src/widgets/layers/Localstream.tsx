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
  const [ styleLeftBox, setStyleLeftBox ] = useState<{width: string, height: string}>({width: '300px', height: '150px'});
  const [ styleRightBox, setStyleRightBox ] = useState<{width: string, height: string}>({width: '0px', height: '150px'});
  const { quality } = useSelector((state: IStore) => state.interface.conference);
  glagol.applyConstraints({ type: 'video', value: quality.video });
  glagol.applyConstraints({ type: 'audio', value: quality.audio });
  const sizes = {
    width: '100px',
    height: '100px',
    viewBox: '-4 0 40 40'
  };

useEffect(()=>{
  if (chatsBoxVisible) {
    console.log('chats changed')
    setStyleLeftBox({ width: config.boxes.chatsbox.width, height: '150px' })
  } else {
    setStyleLeftBox({width:'0px', height: '150px'})
  }
}, [chatsBoxVisible])
  useEffect(()=>{
    if (remoteStreams.length>0){
      setStyleRightBox({width: config.boxes.remoteStreamBox.width, height: '150px'})
    } else {
      setStyleRightBox({width: '0px', height: '150px'})
    }
  }, [remoteStreams])
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
