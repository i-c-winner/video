import { useEffect, useRef } from "react";
import { glagol } from "../../entities/glagol/glagol";
import { Card, CardMedia } from '@mui/material';

function RemoteStreams(props: { streamId: string }) {
  const refVideo = useRef<HTMLVideoElement>(null);
  function gaugeStream() {
    return (props.streamId.includes('/')&&(props.streamId.includes('video')))
  }
  useEffect(() => {
      const screen=glagol.currentStreams.filter(stream=>stream.id===props.streamId)[0]
      if (refVideo.current!==null) refVideo.current.srcObject=screen
  }, [ props.streamId ]);
  return (
    <Card sx={
      {
        flexShrink: '0'
      }
    }>
      {gaugeStream()&&  <CardMedia sx={{}}>
        <video className="video__remoutstream" autoPlay={true} ref={refVideo}/>
      </CardMedia>}
    </Card>
  );
}

export { RemoteStreams };
