import {glagol} from '../../shared/conference/glagol';
import { useEffect, useState } from 'react';
import {sharing} from '../../entity/sharing';
import { RemoteStreamsBox } from '../../widgets/remoteStreams/RemoteStreamsBox';
import { getRemoteTransceivers } from '../../features/room/streams';


function RoomPage() {
  const [transceivers, setTransceivers]=useState<RTCRtpTransceiver[]>([])
  function render() {
    setTransceivers(getRemoteTransceivers())
  }

  useEffect(()=>{
    glagol.roomInstance.create()
    glagol.setRendering(render)
  },[])

  function sharingStart() {
    sharing.start()
  }
  return <div>
    <p>RoomPage</p>
    <button onClick={sharingStart}>sharing</button>
    <RemoteStreamsBox transceivers={transceivers}/>
  </div>
}

export {RoomPage}
