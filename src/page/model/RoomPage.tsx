import {glagol} from '../../shared/conference/glagol';
import { useEffect, useState } from 'react';
import {sharing} from '../../entity/sharing';
import { RemoteStreamsBox } from '../../widgets/remoteStreams/RemoteStreamsBox';
import { getRemoteTransceivers, getSharingTransceiver } from '../../features/room/streams';
import { SharingStream } from '../../widgets/remoteStreams/SharingStream';


function RoomPage() {
  const [transceivers, setTransceivers]=useState<RTCRtpTransceiver[]>([])
  const [sharingTransceiver, setSharingTransceiver]= useState<RTCRtpTransceiver>()
  function render() {
    setTransceivers(getRemoteTransceivers())
    setSharingTransceiver(getSharingTransceiver())
  }
function sharingStart() {
    sharing.start()
}
function stopSharing() {
    sharing.stop()
}
  useEffect(()=>{
    glagol.roomInstance.create()
    glagol.setRendering(render)
  },[])

  return <div>
    <p>RoomPage</p>
    <button onClick={sharingStart}>sharing</button>
    <button onClick={stopSharing}>stop sharing</button>
    <RemoteStreamsBox transceivers={transceivers}/>
    <SharingStream sharingTransceiver={sharingTransceiver} />
  </div>
}

export {RoomPage}
