import {useSelector, useDispatch} from 'react-redux';
import { Box } from '@mui/material';
import { RemoteStreamsBox } from '../remoteStreams/RemoteStreamsBox';
import { LocalStreamsBox } from '../localStreams/LocalStreamsBox';
import { IRootState } from '../../app/types';
import { useState, useEffect } from 'react';
import { conference } from '../../functions/Conference';
import { changeRemoteBoxIsVisible } from '../../app/store/configSlice';

const startIndexRemoteStreams=2
function Screens() {
  const {remoteBoxIsVisible} = useSelector((state: IRootState)=>state.config.UI)
  const [ source, setSource ] = useState<RTCRtpReceiver[]>([]);
  const dispatch=useDispatch()
  const [visibleRemoteBox, setVisibleRemoteBox]=useState(false)
  function render() {
    const allReciveirs = conference.getPeerConnection().getReceivers().slice(startIndexRemoteStreams);
    const reciveirs=allReciveirs.filter((reciveir)=>reciveir.track.kind==='video')
    if (reciveirs.length>0) {
      dispatch(changeRemoteBoxIsVisible(true))
    } else {
      dispatch(changeRemoteBoxIsVisible(false))
    }
    setSource(reciveirs);
  }

  useEffect(() => {
  conference.peerConnectionOn('renderRemoteBox', render);
  return () => {
    conference.peerConnectionOff('renderRemoteBox', render);
  };
  }, []);
  useEffect(()=>{
    if (conference.getPeerConnection().getReceivers().length>0) {
     setVisibleRemoteBox(true)
    } else {
      setVisibleRemoteBox(false)
    }
  })

  return (
    <Box sx={{
      display: 'flex',
      flexGrow: '1',
      height: 'vh100',
      overflowY: 'hidden'
    }}>
      <LocalStreamsBox />
      {visibleRemoteBox?<RemoteStreamsBox source={source}/>: null}
    </Box>
  );
}

export { Screens };
