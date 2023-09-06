import { Box, Pagination } from '@mui/material';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';

function LocalStreamsBox() {
  const refVideo = useRef<any>(null);
  useEffect(() => {
    refVideo.current.srcObject = glagol.localStream;
  }, []);
  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative'
    }}>
      <Header/>
      <video autoPlay={true} ref={refVideo} className="video__bigscreen"/>
      <Pagination
        sx={
          {
            padding: '5px 10px',
            position: 'absolute',
            bottom: '65px',
            justifyContent: 'center',
            display: 'flex',
            width: '100%'
          }
        }
        showFirstButton={true} showLastButton={true} variant="outlined" count={10} hidePrevButton hideNextButton/>
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
