import { RemoteStreams } from "./RemoteStreams";
import { useSelector } from "react-redux";
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { IRootState } from '../../app/types';
import { CreateSvgIcon } from '../createSvgIcon/CreateSvgIcon';
import { iconArrow } from '../../shared/img/svg';

function RemoteStreamsBox() {
  const { disposition, tile } = useSelector((state: IRootState) => state.config.UI);
  const [ remoteBoxIsVisible, setRemoteBoxVisible ] = useState<boolean>(true);
  const streamsId = useSelector((state: IRootState) => {
    return state.streams.streamsId;
  });
  const [ styles, setStyles ] = useState<{ [key: string]: string| (()=>string) }>({});
  const [ arrowStyles, setArrowStyles] = useState<{[key: string]: string}>({ } );

  function togglingRemoteBoxIsVisible() {
    setRemoteBoxVisible(!remoteBoxIsVisible)
  }
  function getPadding() {
    if (remoteBoxIsVisible) {
      return '10px 10px 50px 10px'
    } return '0'
  }
function getArrowDirection() {
    if (remoteBoxIsVisible) {
      return 'rotate(90deg)'
    } return 'rotate(270deg)'
}
  useEffect(() => {
    if (tile) {
      setStyles({
        display: 'none'
      });
    } else {
      if (disposition === 'VERTICAL') {
        setArrowStyles({
          position: 'absolute',
          padding: '5px',
          left: '-45px',
          top: 'calc(100vh/2)',
          transform: getArrowDirection()
        });
        setStyles({
          position: 'absolute',
          top: '0',
          right: '0',
          height: '100vh',
          flexGrow: '1',
          backgroundColor: 'background.paper',
          padding: getPadding(),
          boxSizing: 'border-box',
          display: 'flex'
        });
      } else {
        setStyles({
          right: '',
          position: 'absolute',
          bottom: '70px',
          left: '10px',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexFlow: 'row',
          flexWrap: 'nowrap',
          height: '220px',
          maxWidth: '95%',
          overflowX: 'auto',
        });
      }
    }
  }, [ disposition, tile, remoteBoxIsVisible]);
  useEffect(()=>{

  })
  return (
    <Box sx={
      styles
    }>
      <Button
        onClick={togglingRemoteBoxIsVisible}
        size="small"
        variant="text"
        sx={{
          padding: '0px',
          minWidth: '0px'
        }}
        classes={{
          startIcon: 'marginZero'
        }}
        startIcon={<CreateSvgIcon
          styles={arrowStyles}
          icon={iconArrow}/>}/>
      <Box>
        {remoteBoxIsVisible && streamsId.map((streamId: string) => {
          return  <RemoteStreams key={streamId} streamId={streamId}/>
        })}
      </Box>
    </Box>
  );
}

export { RemoteStreamsBox };
