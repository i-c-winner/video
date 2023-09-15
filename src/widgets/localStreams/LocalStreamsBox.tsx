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
  const { tile } = useSelector((state: any) => state.config.UI);
  const { streamsId } = useSelector((state: any) => state.streams);
  const [ source, setSource ] = useState(streamsId.slice(0, 29));
  const [ page, setPage ] = useState(1);

  function changePage(event: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
    setSource(() => streamsId.slice(30 * (page - 1), (30 + page)));
  }

  function getMaxPages() {
    return Math.ceil(streamsId.length / 30) || 1;
  }

  useEffect(() => {
    setSource(() => {
      return streamsId.slice(30 * (page - 1), (30 + page));
    });
  }, [ streamsId ]);
  useEffect(() => {
    if (refVideo.current !== null) refVideo.current.srcObject = glagol.localStream;
  }, [ tile ]);
  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative'
    }}>
      <Header/>
      {tile ? <Box>
        <Box
          sx={{
            position: 'absolute',
            top: '90px',
            left: '0',
            right: '0',
            bottom: '110px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr 1fr 1fr'
          }}
        >
          {cells.map((index) => {
            const value: string = source[index];
            return <Box
              key={index}
            >
              {value ? <RemoteStreams streamId={value}/> : null}
            </Box>;
          })}
          {/*{source.map((id: string, index: number) => <RemoteStreams key={index} streamId={id}/>)}*/}
        </Box>
        {getMaxPages() > 1 ? <Pagination
          onChange={changePage}
          sx={
            {
              position: 'absolute',
              bottom: '65px',
              justifyContent: 'center',
              display: 'flex',
              width: '100%'
            }
          }
          showFirstButton={true} showLastButton={true} variant="outlined" count={getMaxPages()} hidePrevButton
          hideNextButton/> : null}
      </Box> : <video autoPlay={true} ref={refVideo} className="video__bigscreen"/>}
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
