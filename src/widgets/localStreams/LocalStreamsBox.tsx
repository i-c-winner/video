import { Box, Pagination } from '@mui/material';
import React, { ReactNode, useState } from 'react';
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
import { SingleStreamMode } from './SingleStreamMode';
import { TileStreamMode } from './TileStreamMode';


function LocalStreamsBox() {
  const refVideo = useRef<HTMLVideoElement>(null);
  const refSharingScreen = useRef<HTMLVideoElement>(null);
  const { tile, modeSharingScreen } = useSelector((state: IRootState) => state.config.UI);
  const { itHasSharingStream } = useSelector((state: IRootState) => state.config.functions);
  const { localComponentMode } = useSelector((state: IRootState) => state.config.UI);
  const [children, setChildren]= useState<ReactNode>(<SingleStreamMode/>)
  const dispatch = useDispatch();


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

useEffect(()=>{
  if (localComponentMode.tileStreamMode) {
    setChildren(<TileStreamMode/>)
  } else if (localComponentMode.singleStreamMode) {
    setChildren(<SingleStreamMode />)
  }
}, [localComponentMode])
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
        {children}
        {/*{modeSharingScreen ? bigBoxChildrens.sharingScreen : tile ? bigBoxChildrens.tileMode : bigBoxChildrens.localVideo}*/}
      </BigBox>
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
