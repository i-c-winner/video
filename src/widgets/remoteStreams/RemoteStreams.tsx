import { useEffect, useRef } from "react";
import { glagol } from "../../entities/glagol/glagol";
import { Card, CardMedia } from '@mui/material';
import { conference } from '../../functions/Conference';

function RemoteStreams(props: { reciveir: RTCRtpReceiver }) {
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
      const screen=props.reciveir.track
    if (screen!==null) {
        const stream= new MediaStream()
        stream.addTrack(props.reciveir.track)
        if (refVideo.current!==null) refVideo.current.srcObject=stream
    }

  }, [ props.reciveir]);
  return (
    <Card sx={
      {
        flexShrink: '0'
      }
    }>
      {<CardMedia sx={{}}>
        <video className="video__remoutstream" autoPlay={true} ref={refVideo}/>
      </CardMedia>}
    </Card>
  );
}

export { RemoteStreams };
