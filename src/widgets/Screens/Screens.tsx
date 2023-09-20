import {useSelector} from 'react-redux';
import { Box } from '@mui/material';
import { RemoteStreamsBox } from '../remoteStreams/RemoteStreamsBox';
import { LocalStreamsBox } from '../localStreams/LocalStreamsBox';
import { IRootState } from '../../app/types';

function Screens() {
  const {remoteBoxIsVisible} = useSelector((state: IRootState)=>state.config.UI)
  return (
    <Box sx={{
      display: 'flex',
      flexGrow: '1',
      height: 'vh100',
      overflowY: 'hidden'
    }}>
      <LocalStreamsBox />
      {remoteBoxIsVisible?<RemoteStreamsBox/>: null}
    </Box>
  );
}

export { Screens };
