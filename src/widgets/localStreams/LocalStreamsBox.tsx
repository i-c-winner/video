import { Box, Pagination } from '@mui/material';
import React, { useState } from 'react';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';
import { useSelector } from 'react-redux';
import { RemoteStreams } from '../remoteStreams/RemoteStreams';


const cells: number[] = [];
for (let i = 0; i < 30; i++) {
  cells.push(i);
}
function LocalStreamsBox() {
  const refVideo = useRef<any>(null);
  const { tittle } = useSelector((state: any) => state.config.UI);
  const { streamsId } = useSelector((state: any) => state.streams);
  const [ source, setSource ] = useState(streamsId.slice(0, 29));
  const [ page, setPage ] = useState(1);

  function changePage(event: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
    setSource(() => streamsId.slice(30 * (page - 1), (30 + page)));
  }
  useEffect(() => {
    setSource(() => {
      return streamsId.slice(30 * (page - 1), (30 + page));
    });
  }, [ streamsId ]);
  useEffect(()=>{
    if (refVideo.current!==null) refVideo.current.srcObject=glagol.localStream
  }, [])
  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative'
    }}>
      <Header/>
      {tittle ? <Box>
          <Box
            sx={{
              position: 'absolute',
              top: '90px',
              left: '0',
              right: '0',
              bottom: '110px',
              border: '1px solid red',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr 1fr 1fr'
            }}
          >
            {cells.map((index) => {
              console.log(index);
              const value: string = source[index];
              return <Box
                sx={{
                  border: '1px solid green',
                }}
              >
                {value ? <RemoteStreams streamId={value}/> : null}
              </Box>;
            })}
            {/*{source.map((id: string, index: number) => <RemoteStreams key={index} streamId={id}/>)}*/}
          </Box>
          <Pagination
            onChange={changePage}
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
        </Box>: <video autoPlay={true} ref={refVideo} className="video__bigscreen"/>}
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
