import { RemoteStream } from '../../entity/model/RemoteStream';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getRandomText } from '../../features/plugins/getRandomText';
import { useEffect, useRef, useState } from 'react';
import { glagol } from '../../entity/conference/glagol';
import { IStore } from '../../app/types';
import { RemoteStreamsBoxTileMode } from '../RemoteStreamsBoxTileMode';
import { iconArrow } from '../../shared/img/svg';
import { ButtonWithIcon } from '../../entity/model/UI/button/ButtonWithIcon';
import { changeRemoteStreamsBox } from '../../app/store/interfaceSlice';

const { remoteStreamLayer } = styles;
const defaultButtonStyles = {
  pointerEvents: 'initial',
  background: '#4b4b4b',
  padding: '5px',
  borderRadius: '50%',
  position: 'absolute'
};
const buttonStyleByOpen = {
  ...defaultButtonStyles,
  top: '-32px',
  left: '-180px',
  rotate: '90deg',
};
const buttonStyleByClose = {
  ...defaultButtonStyles,
  top: '90vh',
  left: '20px',
  rotate: '270deg'
};

function RemoteStreamsBox() {
  const { toolboxVisible } = useSelector((state: IStore) => state.interface);
  const refVideo = useRef<HTMLVideoElement>(null);
  const { tileMode, remoteBoxVisible } = useSelector((state: IStore) => state.interface);
  const { remoteStreams } = useSelector((state: IStore) => state.source);
  const [ streamsBoxVisible, setStreamsBoxVisible ] = useState<boolean>(remoteBoxVisible);
  const dispatch = useDispatch();

  function getStyles() {
    const height = toolboxVisible ? 'calc(100vh - 50px)' : '100vh';
    return Object.assign(remoteStreamLayer.wrapper, { height });
  }

  function openStreamsBox() {
    setStreamsBoxVisible(!streamsBoxVisible);
    dispatch(changeRemoteStreamsBox(!streamsBoxVisible));
  }

  useEffect(() => {
    if (remoteStreams.length > 0) {
      setStreamsBoxVisible(true);
      dispatch(changeRemoteStreamsBox(true));
    }
  }, [ remoteStreams ]);

  function getChildren() {
    if (!tileMode) {
      return <Box sx={remoteStreamLayer}>
        {streamsBoxVisible ?
          <Box sx={getStyles()}>
            <Box>
              <Box sx={{ margin: '0 0 0 auto', width: '85%' }} position={'relative'}>
                <video className="video video_my-video" autoPlay={true} ref={refVideo}/>
                <Typography sx={remoteStreamLayer.wrapper.displayName}>{glagol.params.displayName}</Typography>
              </Box>
              <Typography color="white" pt={4}>Количество участников: {remoteStreams.length / 2 + 1}</Typography>
              <hr/>
              <Box sx={
                {

                }
              }>
                {remoteStreams.map((stream: { id: string, type: string }) => {
                  return <RemoteStream key={getRandomText(5)} id={stream.id}/>;
                })}
              </Box>

            </Box>
            <ButtonWithIcon
              classes={{
                startIcon: 'margin_zero'
              }
              }
              sizes={{
                viewBox: '-4 -7 25 25'
              }}
              styles={buttonStyleByOpen}
              startIcon={iconArrow} action={openStreamsBox}/>
          </Box> : remoteStreams.length > 0 ? <ButtonWithIcon
            classes={{
              startIcon: 'margin_zero'
            }
            }
            sizes={{
              viewBox: '-4 -7 25 25'
            }}
            styles={buttonStyleByClose}
            startIcon={iconArrow} action={openStreamsBox}/> : null}
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
