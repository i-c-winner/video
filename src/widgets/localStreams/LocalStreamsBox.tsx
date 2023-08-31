import { Box } from '@mui/material';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';

function LocalStreamsBox() {
const refVideo=useRef<any>(null)
  useEffect(()=>{
    refVideo.current.srcObject=glagol.localStream
  },[])
  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative'
    }}>
      <Header />
      <video autoPlay={true} ref={refVideo}  className="video__bigscreen"/>
      <Toolbox />
    </Box>
  );
}

export { LocalStreamsBox };
