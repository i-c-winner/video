import { Box, Pagination } from '@mui/material';
import React, { useState } from 'react';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';
import { useSelector } from 'react-redux';
import { RemoteStreams } from '../remoteStreams/RemoteStreams';
import { IRootState } from '../../app/types';
import { BigBox } from './BigBox';


const qtyRows = 3;
const qtyColumns = 4;
const qtyScreens = qtyColumns * qtyRows;
const cells: number[] = [];
for (let i = 0; i < qtyScreens; i++) {
  cells.push(i);
}

function LocalStreamsBox() {
  const refVideo = useRef<HTMLVideoElement>(null);
  const refSharingScreen=useRef<HTMLVideoElement>(null)
  const { tile , sharingScreenIsOpen} = useSelector((state: IRootState) => state.config.UI);
  const {itHasSharingStream} = useSelector((state: IRootState)=>state.config.functions)
  const { streamsId } = useSelector((state: IRootState) => state.streams);
  const [ source, setSource ] = useState(streamsId.slice(0, (qtyScreens - 1)));
  const [ page, setPage ] = useState(1);

  function changePage(event: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
    setSource(() => streamsId.slice(qtyScreens * (page - 1), (qtyScreens + page)));
  }

  function getMaxPages() {
    return Math.ceil(streamsId.length / qtyScreens) || 1;
  }

  const bigBoxChildrens = {
    tileMode: <Box
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
          const value: string = source[index];
          return <Box
            key={index}
          >
            {value && <RemoteStreams streamId={value}/>}
          </Box>;
        })}
      </Box>
      {getMaxPages() > 1 && <Pagination
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
    </Box>,
    localVideo: <video autoPlay={true} ref={refVideo} className="video__bigscreen"/>,
    sharingScreenIsOpen: <video autoPlay={true} ref={refSharingScreen} className="video__bigscreen"/>,

  };
  useEffect(() => {
    setSource(() => {
      return streamsId.slice(qtyScreens * (page - 1), (qtyScreens + page));
    });
  }, [ streamsId ]);
  useEffect(() => {
    console.log(sharingScreenIsOpen, 'is SharingScreen')
    if (refVideo.current !== null) refVideo.current.srcObject = glagol.localStream;
  }, [ tile, sharingScreenIsOpen ]);
  useEffect(()=>{
    if (itHasSharingStream) {
      if(refSharingScreen.current!==null) refSharingScreen.current.srcObject=glagol.sharingStream
    }
  },[itHasSharingStream])
  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative',
    }}>
      <Header/>
      <BigBox>
        {sharingScreenIsOpen? bigBoxChildrens.sharingScreenIsOpen:tile? bigBoxChildrens.tileMode: bigBoxChildrens.localVideo}
      </BigBox>
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
