import React, { ForwardedRef } from 'react';
import {iconLogo} from '../../shared/img/svg';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';

const  LocalStream= React.forwardRef((props, ref: ForwardedRef<HTMLVideoElement>)=>{
const sizes= {
  width: '70px',
  height: '70px',
  viewBox: '0 0 40px 40px'
}
  return <Box sx={
    styles.localeStyleLayer
  }>
    <CreateSvgIcon sizes={sizes} styles={styles.localeStyleLayer.logo} icon={iconLogo}></CreateSvgIcon>
    <video className="video video_local" ref={ref} autoPlay={true}/>
  </Box>

})
export {LocalStream}
