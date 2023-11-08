import { useEffect, useRef } from 'react';

function SharingStream(props: { sharingTransceiver: RTCRtpTransceiver | undefined }) {
  const refVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (refVideo.current !== null) {
      const stream = new MediaStream();
      if (props.sharingTransceiver !== undefined) stream.addTrack(props.sharingTransceiver.receiver.track);
      refVideo.current.srcObject = stream;
    }
  });
  return (

    <div>
      <p>{props.sharingTransceiver !== undefined ? props.sharingTransceiver.receiver.track.label : 'no sharing'}</p>
      <video autoPlay={true} ref={refVideo}/>
      <hr/>
    </div>

  );
}

export { SharingStream };
