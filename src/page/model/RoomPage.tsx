import { glagol } from '../../shared/conference/glagol';
import { useEffect, useRef, useState } from 'react';
import { sharing } from '../../entity/sharing';
import '../../widgets/styles/index.scss';
import { RemoteStreamsBox } from '../../widgets/remoteStreams/RemoteStreamsBox';
import { getRemoteTransceivers, getSharingTransceiver } from '../../features/room/streams';
import { SharingStream } from '../../widgets/remoteStreams/SharingStream';
import { changeSharingStatus } from '../../widgets/function/changeSharingStatus';

function RoomPage() {
  const [ transceivers, setTransceivers ] = useState<RTCRtpTransceiver[]>([]);
  const [ iWasSharing, setIWasSharing ] = useState<boolean>(false);
  const [ someBodyWasSharing, setSomeBodyWasSharing ] = useState<boolean>(false);
  const [ sharingTransceiver, setSharingTransceiver ] = useState<RTCRtpTransceiver>();
  const refVideo = useRef<HTMLVideoElement>(null);

  function render() {
    setTransceivers(getRemoteTransceivers());
    setSharingTransceiver(getSharingTransceiver());
    console.log(changeSharingStatus.nobodySharing(), 'NOBODY')
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

    // glagol.peerConnection.getTransceivers().forEach((transceiver) => {
    //   if (transceiver.currentDirection !== 'inactive' && transceiver.sender.track?.contentHint === 'detail') {
    //     setIWasSharing(true);
    //   }
    //   if (transceiver.receiver.track?.label.indexOf('dashboard') >= 0) {
    //     setSomeBodyWasSharing(true);
    //   }
    //   if (refVideo.current !== null && transceiver.sender.track !== null && transceiver.sender.track?.contentHint === 'detail') {
    //     if (iWasSharing) {
    //       stream.addTrack(transceiver.sender.track);
    //     } else if (someBodyWasSharing) {
    //       stream.addTrack(transceiver.receiver.track);
    //     } else if (transceiver.sender.track?.contentHint !== 'detail' && transceiver.sender.track.kind === 'video') {
    //       stream.addTrack(transceiver.sender.track);
    //     }
    //   }
    // });
    // if (refVideo.current !== null) refVideo.current.srcObject = stream;
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

  return <div>
    <video className="video video_local" ref={refVideo} autoPlay={true}/>
    <button onClick={sharingStart}>sharing</button>
    <button onClick={stopSharing}>stop sharing</button>
    <RemoteStreamsBox transceivers={transceivers}/>
    {/*<SharingStream sharingTransceiver={sharingTransceiver} />*/}
  </div>;
}

export { RoomPage };
