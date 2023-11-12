import { RemoteStream } from '../../entity/modele/RemoteStream';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import {useSelector} from 'react-redux';

const { remoteStreamLayer } = styles;

function RemoteStreamsBox() {
const {remoteStreams}=useSelector((state: any)=>state.source)
  return <Box sx={remoteStreamLayer}>
    <Box sx={remoteStreamLayer.wrapper}>
      {remoteStreams.map((id:string) => {
        return <RemoteStream key={id} id={id}/>;
      })}
    </Box>
  </Box>;
}

export { RemoteStreamsBox };
