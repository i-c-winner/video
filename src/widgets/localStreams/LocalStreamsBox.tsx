import { Box, Pagination } from '@mui/material';
import React, { useState } from 'react';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';
import { useSelector } from 'react-redux';
import { RemoteStreams } from '../remoteStreams/RemoteStreams';

function LocalStreamsBox() {
  const refVideo = useRef<any>(null);
  const { tittle } = useSelector((state: any) => state.config.UI);
  const { streamsId } = useSelector((state: any) => state.streams);
  const [ source, setSource ] = useState(streamsId.slice(0, 29));
  const [page, setPage] = useState(1)

  function changePage(event: React.ChangeEvent<unknown>, page: number) {
    setPage(page)
    setSource(() => streamsId.slice(30 * (page - 1), (30 + page)));
  };
  useEffect(()=>{
    setSource(()=>{
      return streamsId.slice(30 * (page - 1), (30 + page))
    })
  }, [streamsId])
  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative'
    }}>
      <Header/>
      {tittle ? <div>
        {source.map((id: string, index: number)=><RemoteStreams  key={index} streamId={id} />)}
          <div>
          </div>
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
        </div>
        : <video autoPlay={true} ref={refVideo} className="video__bigscreen"/>}
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
