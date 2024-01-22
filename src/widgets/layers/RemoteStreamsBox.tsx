import { RemoteStream } from '../../entity/model/RemoteStream';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { useSelector } from 'react-redux';
import { getRandomText } from '../../features/plugins/getRandomText';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entity/conference/glagol';
import { IStore } from '../../app/types';
import { RemoteStreamsBoxTileMode } from '../RemoteStreamsBoxTileMode';
import { VideoCameraSlashIcon } from '@heroicons/react/20/solid';
import { VideoCameraIcon } from '@heroicons/react/24/solid';

const { remoteStreamLayer } = styles;
const styleImageButton = {
  height: '24px',
  width: '24px',
};

function RemoteStreamsBox() {
  const { video } = useSelector((state: IStore) => state.interface.conference.quality);
  const refVideo = useRef<HTMLVideoElement>(null);
  const { tileMode } = useSelector((state: IStore) => state.interface);
  const { remoteStreams } = useSelector((state: IStore) => state.source);


  function getStyles() {
    return Object.assign(remoteStreamLayer.wrapper, {
      display: 'flex',
      flexFlow: 'column',
    });
  }

  function getChildren() {
    if (!tileMode) {
      return <Box sx={remoteStreamLayer}>
        <Box sx={getStyles()}>
          <Box sx={{ margin: '0 0 0 auto' }} position={'relative'}>
            <video className="video video_my-video" autoPlay={true} ref={refVideo}/>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: '7px',
              padding: '2px',
              width: '95%',
              left: '5px'
            }}>
              {video !== 'disabled' ? <Box
                  sx={styleImageButton}
                ><VideoCameraIcon color="white"/></Box> :
                <Box sx={styleImageButton}><VideoCameraSlashIcon color="red"/></Box>}
              <Typography sx={remoteStreamLayer.wrapper.displayName}>{glagol.params.displayName}</Typography>
            </Box>

          </Box>
          <Typography variant="myText" pt={4}>Количество участников: {remoteStreams.length / 2 + 1}</Typography>
          <Box
            sx={
              {
                flexGrow: '1',
                pointerEvents: 'initial',
                height: 'calc(100vh - 512px)',
                overflowY: 'auto',
                overflowX: 'hidden'
              }
            }
          >
            {remoteStreams.map((stream: { id: string, type: string }) => {
              return <RemoteStream key={getRandomText(5)} id={stream.id}/>;
            })}
          </Box>
        </Box>
      </Box>;
    } else {
      return <RemoteStreamsBoxTileMode/>;
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
