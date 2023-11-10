import React, { ForwardedRef } from 'react';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
const  LocalStream= React.forwardRef((props, ref: ForwardedRef<HTMLVideoElement>)=>{
  return <Box sx={
    styles.localeStyle
  }>
    <video className="video video_local" ref={ref} autoPlay={true}/>
  </Box>

})
export {LocalStream}
