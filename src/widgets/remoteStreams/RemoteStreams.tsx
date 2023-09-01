import { useEffect, useRef } from "react";
import { glagol } from "../../entities/glagol/glagol";
import { Card, CardActionArea, CardMedia } from '@mui/material';
import { PeerConnection } from '../../entities/conference/peerConnection';

const peerConnection = new PeerConnection('https://xmpp.prosolen.net:5281/http-bind');

function RemoteStreams(props: { streamId: string }) {
  const refVideo = useRef<any>(null);
  useEffect(() => {
    glagol.currentStreams[props.streamId].stream.getTracks().forEach((track)=>{
      console.log(track, 'TRACK')
      if (track.kind==='video') {
        refVideo.current.srcObject=glagol.currentStreams[props.streamId].stream
      }
    })

  }, [props.streamId]);
  return (
    <Card>
        <CardMedia sx={{
          width: '300px'
        }}>
          <video className='video__remoutstream' autoPlay={true} ref={refVideo}/>
        </CardMedia>
    </Card>
  );
}

export { RemoteStreams };
