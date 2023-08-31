import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { Box } from '@mui/material';
import { RemoteStreamsBox } from '../remoteStreams/RemoteStreamsBox';
import { LocalStreamsBox } from '../localStreams/LocalStreamsBox';

function Screens() {

  return (
    <Box sx={{
      display: 'flex',
      flexGrow: '1',
    }}>
      <LocalStreamsBox />
      <RemoteStreamsBox/>
    </Box>
  );
}

export { Screens };
