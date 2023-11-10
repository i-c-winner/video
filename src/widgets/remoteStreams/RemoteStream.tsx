import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import zIndex from '@mui/material/styles/zIndex';

const { remoteStreamStyles } = styles;

function RemoteStream(props: { transceiver: RTCRtpTransceiver }) {
  const refVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (refVideo.current !== null) {
      const stream = new MediaStream();
      stream.addTrack(props.transceiver.receiver.track);
      refVideo.current.srcObject = stream;
    }
  });

  function getClasses(type: string) {
    console.log(type);
    if (type === 'audio') {
      return 'video_remote video_remote_audio';
    } else if (type === 'video') {
      return 'video_remote video_remote_video';
    }
    return 'video_remote';
  }

function getBoxClasses(kind: string) {
    if (kind==='audio') {
      return 'remote-box remote-box_audio'
    } else if (kind==='video') {
      return 'remote-box remote-box_video'
    }
}

return <div className={getBoxClasses(props.transceiver.receiver.track?.kind)}>
  <p>{props.transceiver.receiver.track.label}</p>
  <video className={getClasses(props.transceiver.receiver.track?.kind)} autoPlay={true} ref={refVideo}/>
</div>;
}

export { RemoteStream };
