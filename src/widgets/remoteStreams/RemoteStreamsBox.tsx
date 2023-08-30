import { RemoteStreams } from "./RemoteStreams";
import {useSelector} from "react-redux";


function RemoteStreamsBox() {
  const streamsId=useSelector((state: any)=>{
    return state.streams.streamsId
  })
  { return streamsId.map((streamId: string)=>{
    return <RemoteStreams key={streamId} streamId={streamId}/>
  })}
}

export { RemoteStreamsBox }
