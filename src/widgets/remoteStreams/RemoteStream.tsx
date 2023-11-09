import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';

const { remoteStream } = styles;

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
    console.log(type)
    if (type === 'audio') {
      return 'video video_remote video_remote_audio';
    } else if(type==='video'){
      return 'video video_remote video_remote_video';
    }
    return 'video video_remote';
  }
  {return props.transceiver.receiver.track?.kind==='video'&&<Box sx={remoteStream}>
      <p>{props.transceiver.receiver.track.label}</p>
      <video className={getClasses(props.transceiver.receiver.track?.kind)} autoPlay={true} ref={refVideo}/>
    </Box>}
}

export { RemoteStream };
