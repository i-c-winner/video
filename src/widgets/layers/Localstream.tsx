import React, { ForwardedRef } from 'react';
import { RemoteStreamsBox } from './RemoteStreamsBox';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { glagol } from '../../entity/conference/glagol';
import { BadgeAvatars } from '../../entity/model/avatar/BadgeAvatar';

const LocalStream = React.forwardRef((props, ref: ForwardedRef<HTMLVideoElement>) => {

  const { video } = useSelector((state: IStore) => state.interface.conference.quality);
  const { quality } = useSelector((state: IStore) => state.interface.conference);
  glagol.applyConstraints({ type: 'video', value: quality.video });
  glagol.applyConstraints({ type: 'audio', value: quality.audio });


  return <Box sx={
    styles.localeStyleLayer
  }>
    <RemoteStreamsBox/>
    {video === 'disabled' ? <Box sx={{ width: '100%', paddingTop: '10vh' }}><BadgeAvatars
        styles={{ color: 'green' }}
        sizes={{ width: 250, height: 250 }}/></Box> :
      <video className="video video_local" ref={ref} autoPlay={true}/>}
  </Box>;

});
export { LocalStream };
