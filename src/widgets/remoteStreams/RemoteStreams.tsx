import { useEffect, useRef } from "react";
import { Card, CardMedia } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {changeItHasSharingStream} from '../../app/store/configSlice';
import { IRootState } from '../../app/types';

function RemoteStreams(props: { reciveir: RTCRtpReceiver }) {
  const refVideo = useRef<HTMLVideoElement>(null);
  const {sharingScreenIsOpen} =useSelector((state: IRootState)=>state.config.UI)
const dispatch=useDispatch()
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
      {<CardMedia>
        <video className={getClassName()} autoPlay={true} ref={refVideo}/>
      </CardMedia>}
    </Card>
  );
}

export { RemoteStreams };
