import { useEffect, useRef } from "react";
import { glagol } from "../../entities/glagol/glagol";
import { Card, CardMedia } from '@mui/material';

function RemoteStreams(props: { streamId: string }) {
  const refVideo = useRef<any>(null);
  useEffect(() => {
    glagol.currentStreams[props.streamId].stream.getTracks().forEach((track)=>{
      if (track.kind==='video') {
        refVideo.current.srcObject=glagol.currentStreams[props.streamId].stream
      }
    })

  }, [props.streamId]);
  return (
      <Card sx={
        {
          flexShrink: '0'
        }
      }>
        <CardMedia sx={{
        }}>
          <video className='video__remoutstream' autoPlay={true} ref={refVideo}/>
        </CardMedia>
      </Card>
  );
}

export { RemoteStreams };
