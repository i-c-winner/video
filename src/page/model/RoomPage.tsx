import { glagol } from '../../shared/conference/glagol';
import React, { useEffect, useRef, useState } from 'react';
import { sharing } from '../../entity/sharing';
import '../../widgets/styles/index.scss';
import { RemoteStreamsBox } from '../../widgets/layers/RemoteStreamsBox';
import { getRemoteTransceivers, getSharingTransceiver } from '../../features/room/streams';
import { changeSharingStatus } from '../../widgets/function/changeSharingStatus';
import { Box } from '@mui/material';
import { LocalStream } from '../../widgets/layers/Localstream';
import { Toolbox } from '../../widgets/layers/Toolbox';
import { ChatsBox } from '../../widgets/layers/ChatsBox';
import { TopPanel } from '../../widgets/layers/TopPanel';

function RoomPage() {
  const [ transceivers, setTransceivers ] = useState<RTCRtpTransceiver[]>([]);
  const refVideo = useRef<HTMLVideoElement>(null);

  function render() {
    setTransceivers(getRemoteTransceivers());
    console.log(changeSharingStatus.nobodySharing(), 'NOBODY');
    const stream = new MediaStream();
    if (refVideo.current !== null) {
      if (changeSharingStatus.iWasSharing()) {
        const track = changeSharingStatus.iWasSharing()?.sender.track as MediaStreamTrack;
        stream.addTrack(track);
        refVideo.current.srcObject = stream;
      }
      if (changeSharingStatus.someBodySharing()) {
        const track = changeSharingStatus.someBodySharing()?.receiver.track as MediaStreamTrack;
        stream.addTrack(track);
        refVideo.current.srcObject = stream;
      }
      if (changeSharingStatus.nobodySharing()) {
        glagol.peerConnection.getTransceivers().forEach((transceiver) => {
          if (transceiver.sender.track?.kind === 'video') {
            stream.addTrack(transceiver.sender.track);
          }
        });
        refVideo.current.srcObject = stream;
      }
    }
  }

  function sharingStart() {
    sharing.start();
  }

  function stopSharing() {
    sharing.stop();
  }

  useEffect(() => {
    glagol.roomInstance.create();
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

  return <Box sx={{
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex:10
  }
  } display="flex">
    <TopPanel />
    <LocalStream ref={refVideo}/>
    {/*<button onClick={sharingStart}>sharing</button>*/}
    {/*<button onClick={stopSharing}>stop sharing</button>*/}
    <RemoteStreamsBox transceivers={transceivers}/>
    <ChatsBox/>
    <Toolbox/>
  </Box>;
}

export { RoomPage };
