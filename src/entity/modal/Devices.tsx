import {Box} from '@mui/material';
import { useEffect, useRef } from 'react';
import { glagol } from '../conference/glagol';

function Devices() {
  const refVideo=useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const stream=new MediaStream()
    glagol.peerConnection.getSenders().forEach((sender)=>{
      if (sender.track?.kind==='video' && sender.track?.contentHint!=='detail') {
        stream.addTrack(sender.track)
      }
    })
    if (refVideo.current) refVideo.current.srcObject=stream
  }, []);
  return (
    <Box>
      <Box ><video autoPlay={true} className='video video_settings' ref={refVideo}/></Box>
      <Box></Box>
    </Box>
  )
}
export {Devices}
