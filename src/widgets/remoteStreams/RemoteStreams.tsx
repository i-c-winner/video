import { useEffect, useRef } from "react";
import { Card, CardMedia } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { IRootState } from '../../app/types';

function RemoteStreams(props: { receiver: RTCRtpReceiver }) {
  const refVideo = useRef<HTMLVideoElement>(null);
const dispatch=useDispatch()
  function getClassName() {
    return props.receiver.track.kind === 'audio' ? 'video__remotestream video__remotestream_audio' : 'video__remotestream' +
      ' video__remotestream_video';
  }

  useEffect(() => {
    const screen = props.receiver.track;
    if (screen !== null) {
      const stream = new MediaStream();
      stream.addTrack(props.receiver.track);
        if (refVideo.current !== null) refVideo.current.srcObject = stream;
    }
  }, [ props.receiver ]);
  return (
    <Card sx={
      {
        flexShrink: '0'
      }
    }>
      {<CardMedia>
        <video className={getClassName()} autoPlay={true} ref={refVideo}/>
      </CardMedia>}
    </Card>
  );
}

export { RemoteStreams };
