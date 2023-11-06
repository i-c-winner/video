import {glagol} from '../../shared/conference/glagol';
import { useEffect } from 'react';
import {sharing} from '../../entity/sharing';
import { RemoteStreamsBox } from '../../widgets/remoteStreams/RemoteStramsBox';

function RoomPage() {
  useEffect(()=>{
    glagol.roomInstance.create()
  },[])
  function sharingStart() {
    sharing.start()
  }
  return <div>
    <p>RoomPage</p>
    <button onClick={sharingStart}>sharing</button>
    <RemoteStreamsBox />
  </div>
}

export {RoomPage}
