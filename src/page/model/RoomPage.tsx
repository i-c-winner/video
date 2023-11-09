import {glagol} from '../../shared/conference/glagol';
import { useEffect, useRef, useState } from 'react';
import {sharing} from '../../entity/sharing';
import '../styles/index.scss'
import { RemoteStreamsBox } from '../../widgets/remoteStreams/RemoteStreamsBox';
import { getRemoteTransceivers, getSharingTransceiver } from '../../features/room/streams';
import { SharingStream } from '../../widgets/remoteStreams/SharingStream';

function RoomPage() {
  const [transceivers, setTransceivers]=useState<RTCRtpTransceiver[]>([])
  const [sharingTransceiver, setSharingTransceiver]= useState<RTCRtpTransceiver>()
  const refVideo= useRef<HTMLVideoElement>(null)
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
    const stream= new MediaStream()
    glagol.peerConnection.getTransceivers().forEach((transceiver)=>{
      if (transceiver.sender.track?.kind==='video') {
        stream.addTrack(transceiver.sender.track)
      }
    })
    if (refVideo.current!==null) {
      refVideo.current.srcObject=stream
    }
  },[])

  return <div>
    <video className='video video_local'  ref={refVideo} autoPlay={true} />
    {/*<p>RoomPage</p>*/}
    {/*<button onClick={sharingStart}>sharing</button>*/}
    {/*<button onClick={stopSharing}>stop sharing</button>*/}
    <RemoteStreamsBox transceivers={transceivers}/>
    {/*<SharingStream sharingTransceiver={sharingTransceiver} />*/}
  </div>
}

export {RoomPage}
