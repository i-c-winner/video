import { RemoteStream } from '../../entity/modele/RemoteStream';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import {useSelector} from 'react-redux';
import { getRandomText } from '../../features/plugins/getRandomText';

const { remoteStreamLayer } = styles;

function RemoteStreamsBox() {
const {remoteStreams}=useSelector((state: any)=>state.source)
  return <Box sx={remoteStreamLayer}>
    <Box sx={remoteStreamLayer.wrapper}>
      {remoteStreams.map((id:string) => {
        return <RemoteStream key={getRandomText(5)} id={id}/>;
      })}
    </Box>
  </Box>;
}

export { RemoteStreamsBox };
