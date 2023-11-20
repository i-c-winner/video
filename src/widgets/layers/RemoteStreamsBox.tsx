import { RemoteStream } from '../../entity/model/RemoteStream';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { useSelector } from 'react-redux';
import { getRandomText } from '../../features/plugins/getRandomText';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entity/conference/glagol';
import { IStore } from '../../app/types';
import { RemoteStreamsBoxTileMode } from '../modal/RemoteStreamsBoxTileMode';

const { remoteStreamLayer } = styles;

function RemoteStreamsBox() {
  const { toolboxVisible } = useSelector((state: IStore) => state.interface);
  const refVideo = useRef<HTMLVideoElement>(null);
  const { chatsBoxVisible, tileMode } = useSelector((state: IStore) => state.interface);
  const { remoteStreams } = useSelector((state: IStore) => state.source);

  function getStyles() {
    const height = toolboxVisible ? 'calc(100vh - 50px)' : '100vh';
    return Object.assign(remoteStreamLayer.wrapper, { height });
  }


  function getChildren() {
    if (!tileMode) {
      return  <Box sx={remoteStreamLayer}>
        { remoteStreams.length>0 && <Box sx={getStyles()}>
          <Box>
            {remoteStreams.map((stream: { id: string, type: string }) => {
              return <RemoteStream key={getRandomText(5)} id={stream.id}/>;
            })}
          </Box>
          <Box position={'relative'}>
            <video className="video video_my-video" autoPlay={true} ref={refVideo}/>
            <Typography sx={remoteStreamLayer.wrapper.displayName}>{glagol.params.displayName}</Typography>
          </Box>

        </Box>}
      </Box>;
    } else {
      return <RemoteStreamsBoxTileMode />;
    }
  }

  useEffect(() => {
    glagol.peerConnection.getSenders().forEach((sender) => {
      if (sender.track?.kind === 'video' && sender.track.contentHint !== 'detail') {
        const stream = new MediaStream();
        stream.addTrack(sender.track);
        if (refVideo.current) refVideo.current.srcObject = stream;
      }
    });
  });

  return getChildren();
}

export { RemoteStreamsBox };
