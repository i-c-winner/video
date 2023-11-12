import { glagol } from '../../shared/conference/glagol';
import React, { useEffect, useRef, useState } from 'react';
import '../../widgets/styles/index.scss';
import { RemoteStreamsBox } from '../../widgets/layers/RemoteStreamsBox';
import { getRemoteTransceivers } from '../../features/room/streams';
import { changeSharingStatus } from '../../widgets/function/changeSharingStatus';
import { Box } from '@mui/material';
import { LocalStream } from '../../widgets/layers/Localstream';
import { Toolbox } from '../../widgets/layers/Toolbox';
import { ChatsBox } from '../../widgets/layers/ChatsBox';
import { TopPanel } from '../../widgets/layers/TopPanel';
import { useDispatch } from 'react-redux';
import { addRemoteTrack, addSharing, removeRemoteTrack, removeSharing } from '../../app/store/sourceSlice';
import { red } from '@mui/material/colors';

function RoomPage() {
  const [ transceivers, setTransceivers ] = useState<RTCRtpTransceiver[]>([]);
  const refVideo = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();

  function render() {
    // setTransceivers(getRemoteTransceivers());
    // console.log(changeSharingStatus.nobodySharing(), 'NOBODY');
    // const stream = new MediaStream();
    // if (refVideo.current !== null) {
    //   if (changeSharingStatus.iWasSharing()) {
    //     const track = changeSharingStatus.iWasSharing()?.sender.track as MediaStreamTrack;
    //     stream.addTrack(track);
    //     refVideo.current.srcObject = stream;
    //   }
    //   if (changeSharingStatus.someBodySharing()) {
    //     const track = changeSharingStatus.someBodySharing()?.receiver.track as MediaStreamTrack;
    //     stream.addTrack(track);
    //     refVideo.current.srcObject = stream;
    //   }
    //   if (changeSharingStatus.nobodySharing()) {
    //     glagol.peerConnection.getTransceivers().forEach((transceiver) => {
    //       if (transceiver.sender.track?.kind === 'video') {
    //         stream.addTrack(transceiver.sender.track);
    //       }
    //     });
    //     refVideo.current.srcObject = stream;
    //   }
    // }
  }


  useEffect(() => {
    glagol.roomInstance.create();
    glagol.on('addTrackToSource', addTrackToSource);
    glagol.on('addSharingToSource', addSharingToSource);
    glagol.on('removeSharingFromSource', removeSharingFromSource);
    glagol.on('removeRemoteTrackFormSource', removeRemoteTrackFormSource);
    glagol.on('renderMySharing', renderMySharing);
    glagol.on('remoteMySharing', remoteMySharing)
    glagol.setRendering(render);
    const stream = new MediaStream();
    glagol.peerConnection.getTransceivers().forEach((transceiver) => {
      if (transceiver.sender.track?.kind === 'video') {
        stream.addTrack(transceiver.sender.track);
      }
    });
    if (refVideo.current !== null) {
      refVideo.current.srcObject = stream;
    }
  }, []);

  function addTrackToSource(id: string) {
    dispatch(addRemoteTrack(id));
  }

  function addSharingToSource(id: string) {
    dispatch(addSharing(id[0]));
  }

  function removeSharingFromSource() {
    dispatch(removeSharing());
  }

  function removeRemoteTrackFormSource(id: string) {
    dispatch(removeRemoteTrack(id));
  }

  function renderMySharing() {
    const stream = new MediaStream;
    glagol.peerConnection.getTransceivers().forEach((transceiver) => {
      if (transceiver.sender.track?.contentHint === 'detail') {
        stream.addTrack(transceiver.sender.track);
      }
      if (refVideo.current !== null) refVideo.current.srcObject = stream;
    });
  }
  function remoteMySharing() {
  }

  return <Box sx={{
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: 10
  }
  } display="flex">
    <TopPanel/>
    <LocalStream ref={refVideo}/>
    <RemoteStreamsBox transceivers={transceivers}/>
    <ChatsBox/>
    <Toolbox/>
  </Box>;
}

export { RoomPage };
