import { RemoteStreams } from "./RemoteStreams";
import {useSelector} from "react-redux";
import {Box} from '@mui/material';

function RemoteStreamsBox() {
  const streamsId=useSelector((state: any)=>{
    return state.streams.streamsId
  })
  return (
    <Box sx={
      {
        width: '250px',
        position: 'absolute',
        top: '0',
        right: '0',
        border: '1px solid red',
        height: '100px',
        flexGrow: '1'
      }
    }>
      {streamsId.map((streamId: string)=>{
        return <RemoteStreams key={streamId} streamId={streamId}/>
      })}
    </Box>
  )
}

export { RemoteStreamsBox }
