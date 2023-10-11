import { Box, Pagination } from '@mui/material';
import { RemoteStreams } from '../remoteStreams/RemoteStreams';
import React, { useRef, useState } from 'react';
import { conference } from '../../functions/Conference';

const qtyRows = 3;
const qtyColumns = 4;
const qtyScreens = qtyColumns * qtyRows;
const cells: number[] = [];
for (let i = 0; i < qtyScreens; i++) {
  cells.push(i);
}

function TileStreamMode () {
  const refVideo=useRef<HTMLVideoElement>(null)
  const remoteStreams = conference.getPeerConnection().getReceivers().slice(2);
  const [ source, setSource ] = useState(remoteStreams.slice(0, (qtyScreens - 1)));
  const [ page, setPage ] = useState(1);
  function changePage(event: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
    setSource(() => remoteStreams.slice(qtyScreens * (page - 1), (qtyScreens + page)));
  }

  function getMaxPages() {
    return 5
    return Math.ceil(remoteStreams.length / qtyScreens) || 1;
  }
  // useEffect(()=>{
  //   setSource(() => {
  //     return remoteStreams.slice(qtyScreens * (page - 1), (qtyScreens + page));
  //   });
  // })

  return <Box
    sx={{
      display: 'flex',
      paddingTop: '100px'
    }}>
    <video autoPlay={true} ref={refVideo} className="video__localstream"/>
    <Box
      sx={{
        marginRight: '10px',
        height: 'calc(100vh - 170px)',
        top: '90px',
        left: '0',
        right: '0',
        bottom: '110px',
        display: 'grid',
        gridTemplateColumns: `repeat(${qtyColumns}, 1fr)`,
        gridTemplateRows: `repeat(${qtyRows}, 1fr)`
      }}
    >
      {cells.map((index) => {
        const value = source[index];
        return <Box
          key={index}
        >
          {value && <RemoteStreams receiver={value}/>}
        </Box>;
      })}
    </Box>
    {getMaxPages() > 0 && <Pagination
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
      hideNextButton/>}
  </Box>
}

export {TileStreamMode}
