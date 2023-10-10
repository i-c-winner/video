import { Box, Pagination } from '@mui/material';
import React, { useState } from 'react';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';
import { useDispatch, useSelector } from 'react-redux';
import { RemoteStreams } from '../remoteStreams/RemoteStreams';
import { IRootState } from '../../app/types';
import { BigBox } from './BigBox';
import { conference } from '../../functions/Conference';
import { changeModeSharingScreen } from '../../app/store/configSlice';
import {SingleStreamMode} from './SingleStreamMode';


const qtyRows = 3;
const qtyColumns = 4;
const qtyScreens = qtyColumns * qtyRows;
const cells: number[] = [];
for (let i = 0; i < qtyScreens; i++) {
  cells.push(i);
}

function LocalStreamsBox() {
  const refVideo = useRef<HTMLVideoElement>(null);
  const refSharingScreen = useRef<HTMLVideoElement>(null);
  const { tile, modeSharingScreen } = useSelector((state: IRootState) => state.config.UI);
  const { itHasSharingStream } = useSelector((state: IRootState) => state.config.functions);
  const {localComponentMode} = useSelector((state: IRootState)=> state.config.UI)
  const remoteStreams = conference.getPeerConnection().getReceivers().slice(2);
  const [ source, setSource ] = useState(remoteStreams.slice(0, (qtyScreens - 1)));
  const [ page, setPage ] = useState(1);
  const dispatch = useDispatch();

  function changePage(event: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
    setSource(() => remoteStreams.slice(qtyScreens * (page - 1), (qtyScreens + page)));
  }

  function getMaxPages() {
    return Math.ceil(remoteStreams.length / qtyScreens) || 1;
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
    </Box>,
    localVideo: <video autoPlay={true} ref={refVideo} className="video__bigscreen"/>,
    sharingScreen: <video autoPlay={true} ref={refSharingScreen} className="video__bigscreen video__bigscreen_sharing"/>
  };

  function renderSharingScreen() {
    dispatch(changeModeSharingScreen(true));
  }

  function getSharingSender() {
    return conference.getPeerConnection().getSenders().filter((sender) => {
      if (sender.track !== null) {
        console.log(sender.track.contentHint, 'HINT');
        return sender.track.contentHint === 'detail';
      }
    });
  }

  function getSharingReciveir() {
    return conference.getPeerConnection().getReceivers().filter((receiver) => {
      if (receiver.track !== null) {
        return receiver.track.id.indexOf('dashboard') >= 0;
      }
    });
  }
function getChildren(){
    if (localComponentMode.singleStreamMode) return <SingleStreamMode />
}
  useEffect(() => {
    const source = getSharingSender().length > 0 ? getSharingSender() : getSharingReciveir();
    if (refSharingScreen.current !== null) {
      const stream = new MediaStream();
      try {
        if (source[0].track !== null) {
          stream.addTrack(source[0].track);
          refSharingScreen.current.srcObject = stream;
        }
      } catch (e) {

      }
    }
  }, [ modeSharingScreen ]);
  useEffect(() => {
    conference.XmppOn('renderSharingScreen', renderSharingScreen);
    conference.peerConnectionOn('renderSharingScreen', renderSharingScreen);
    setSource(() => {
      return remoteStreams.slice(qtyScreens * (page - 1), (qtyScreens + page));
    });
  }, []);

  useEffect(() => {
    if (refVideo.current !== null) refVideo.current.srcObject = glagol.localStream;

  }, [ tile, modeSharingScreen ]);
  useEffect(() => {
    if (itHasSharingStream) {
      if (refSharingScreen.current !== null) refSharingScreen.current.srcObject = glagol.sharingStream;
    }
  }, [ itHasSharingStream ]);
  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative',
    }}>
      <Header/>
      <BigBox>
        {getChildren()}
        {/*{modeSharingScreen ? bigBoxChildrens.sharingScreen : tile ? bigBoxChildrens.tileMode : bigBoxChildrens.localVideo}*/}
      </BigBox>
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
