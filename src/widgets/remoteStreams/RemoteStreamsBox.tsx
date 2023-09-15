import { RemoteStreams } from "./RemoteStreams";
import { useSelector } from "react-redux";
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

function RemoteStreamsBox() {
  const { disposition, tile } = useSelector((state: any) => state.config.UI);
  const streamsId = useSelector((state: any) => {
    return state.streams.streamsId;
  });
  const [ styles, setStyles ] = useState<{ [key: string]: string }>({
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100px',
    flexGrow: '1'
  });

  useEffect(() => {
    if (tile) {
      setStyles({
        display: 'none'
      })
    } else {
      if (disposition === 'VERTICAL') {
        setStyles({
          position: 'absolute',
          top: '0',
          right: '0',
          height: '100px',
          flexGrow: '1'
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
  }, [ disposition, tile ]);

    return (
      <Box sx={
        styles
      }>
        {streamsId.map((streamId: string) => {
          return <RemoteStreams key={streamId} streamId={streamId}/>;
        })}
      </Box>
    )
}

export { RemoteStreamsBox };
