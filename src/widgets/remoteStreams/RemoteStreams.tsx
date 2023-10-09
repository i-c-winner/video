import { useEffect, useRef } from "react";
import { glagol } from "../../entities/glagol/glagol";
import { Card, CardMedia } from '@mui/material';
import { conference } from '../../functions/Conference';

function RemoteStreams(props: { reciveir: RTCRtpReceiver }) {
  const refVideo = useRef<HTMLVideoElement>(null);

  function getClassName() {
    return props.reciveir.track.kind === 'audio' ? 'video__remotestream video__remotestream_audio' : 'video__remotestream' +
      ' video__remotestream_video';
  }

  useEffect(() => {
    const screen = props.reciveir.track;
    if (screen !== null) {
      const stream = new MediaStream();
      stream.addTrack(props.reciveir.track);
      if (refVideo.current !== null) refVideo.current.srcObject = stream;
    }

  }, [ props.reciveir ]);
  return (
    <Card sx={
      {
        flexShrink: '0'
      }
    }>
      {<CardMedia sx={{}}>
        <video className={getClassName()} autoPlay={true} ref={refVideo}/>
      </CardMedia>}
    </Card>
  );
}

export { RemoteStreams };
