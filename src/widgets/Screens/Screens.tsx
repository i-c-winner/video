import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { RemoteStreamsBox } from '../remoteStreams/RemoteStreamsBox';
import { LocalStreamsBox } from '../localStreams/LocalStreamsBox';
import { useState, useEffect } from 'react';
import { conference } from '../../functions/Conference';
import { changeRemoteBoxIsVisible } from '../../app/store/configSlice';

const startIndexRemoteStreams=2
function Screens() {
  const [ source, setSource ] = useState<RTCRtpReceiver[]>([]);
  const dispatch = useDispatch();
  const [ visibleRemoteBox, setVisibleRemoteBox ] = useState(false);

  function renderRemoteBox() {
    const receivers = conference.getPeerConnection().getReceivers().slice(startIndexRemoteStreams);

    const filteredRecivers = receivers.filter((receiver)=>{
          return receiver.track.id.indexOf('dashboard')===-1
    })
    if (filteredRecivers.length > 0) {
      dispatch(changeRemoteBoxIsVisible(true));
    } else {
      dispatch(changeRemoteBoxIsVisible(false));
    }
    setSource(filteredRecivers)
  }

  useEffect(() => {
    conference.peerConnectionOn('renderRemoteBox', renderRemoteBox);
  }, []);
  useEffect(() => {
    if (conference.getPeerConnection().getReceivers().length > 0) {
      setVisibleRemoteBox(true);
    } else {
      setVisibleRemoteBox(false);
    }
  });

  return (
    <Box sx={{
      display: 'flex',
      flexGrow: '1',
      height: 'vh100',
      overflowY: 'hidden'
    }}>
      <LocalStreamsBox/>
      {visibleRemoteBox ? <RemoteStreamsBox source={source}/> : null}
    </Box>
  );
}

export { Screens };
