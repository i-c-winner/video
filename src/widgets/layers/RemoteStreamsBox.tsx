import { RemoteStream } from '../../entity/model/RemoteStream';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import {useSelector} from 'react-redux';
import { getRandomText } from '../../features/plugins/getRandomText';

const { remoteStreamLayer } = styles;

function RemoteStreamsBox() {
const {remoteStreams}=useSelector((state: any)=>state.source)
  return <Box sx={remoteStreamLayer}>
    <Box sx={remoteStreamLayer.wrapper}>
      {remoteStreams.map((stream: {id: string, type: string}) => {
        return <RemoteStream key={getRandomText(5)} id={stream.id}/>;
      })}
    </Box>
  </Box>;
}

export { RemoteStreamsBox };
