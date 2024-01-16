import { glagol } from '../../entity/conference/glagol';
import React, { useEffect, useRef } from 'react';
import '../../widgets/styles/index.scss';
import { RemoteStreamsBox } from '../../widgets/layers/RemoteStreamsBox';
import { Box } from '@mui/material';
import { LocalStream } from '../../widgets/layers/Localstream';
import { Toolbox } from '../../widgets/layers/Toolbox';
import { ChatsBox } from '../../widgets/layers/ChatsBox';
import { TopPanel } from '../../widgets/layers/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import { addRemoteTrack, addSharing, removeRemoteTrack, removeSharing } from '../../app/store/sourceSlice';
import { IStore, TStream } from '../../app/types';
import { addChat } from '../../app/store/chatsSlice';
import { addFile } from '../../app/store/filesSlice';

interface IMessage {
  text: string,
  id: string,
  author: string
}


function RoomPage() {
  const refVideo = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();
  const { sharing } = useSelector((state: IStore) => state.source);


  function addTrackToSource(args: any[]) {
    if (typeof args[0]) dispatch(addRemoteTrack(args[0]));
  }

  function addSharingToSource(...args: TStream[]) {
    dispatch(addSharing(args[0]));
  }

  const removeSharingFromSource = () => {
    renderScreenStream();
    dispatch(removeSharing());
  };

  function removeRemoteTrackFormSource(id: string[]) {
    dispatch(removeRemoteTrack(id[0]));
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

  function renderScreenStream() {
    const stream = new MediaStream();
    glagol.peerConnection.getTransceivers().forEach((transceiver) => {
      if (transceiver.sender.track?.kind === 'video') {
        stream.addTrack(transceiver.sender.track);
      }
    });
    if (refVideo.current !== null) {
      refVideo.current.srcObject = stream;
    }
  }

  function messageReceived(message: [ IMessage ]) {
    dispatch(addChat(message[0]));
  }

  function addFileForSaving(params: any) {
    dispatch(addFile(params[0]));
  }

  useEffect(() => {
    glagol.roomInstance.create();
    glagol.on('addTrackToSource', addTrackToSource);
    glagol.on('addSharingToSource', addSharingToSource);
    glagol.on('removeSharingFromSource', removeSharingFromSource);
    glagol.on('removeRemoteTrackFormSource', removeRemoteTrackFormSource);
    glagol.on('renderMySharing', renderMySharing);
    glagol.on('messageReceived', messageReceived);
    glagol.on('addFileForSaving', addFileForSaving);
  }, []);
  useEffect(() => {
    const stream = new MediaStream();
    if (Array.isArray(sharing)) {
      glagol.peerConnection.getTransceivers().forEach((transceiver) => {
        if (transceiver.receiver.track?.id === sharing[0].id) {
          if (transceiver.receiver.track) stream.addTrack(transceiver.receiver.track);
        }
      });
      if (refVideo.current !== null) refVideo.current.srcObject = stream;
    } else if (sharing !== undefined) {
      glagol.peerConnection.getTransceivers().forEach((transceiver) => {
        if (sharing) {
          if (transceiver.receiver.track?.id === sharing.id) {
            if (transceiver.sender.track) stream.addTrack(transceiver.sender.track);
          }
        }

      });
      if (refVideo.current !== null) refVideo.current.srcObject = stream;
    } else {
      renderScreenStream();
    }
  }, [ sharing ]);

  return <Box
    sx={{
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      bgcolor: 'background.paper',
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <Box sx={{
      flexGrow: '1',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between'
    }}>
      <TopPanel/>
      <LocalStream ref={refVideo}/>
      <Toolbox/>
    </Box>
    <ChatsBox/>

  </Box>;
}

export { RoomPage };
