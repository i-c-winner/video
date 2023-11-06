import { glagol } from '../../shared/conference/glagol';
import {getRemoteStreams} from '../../features/room/streams';
import { useEffect, useState } from 'react';
import { RemoteStream } from './RemoteStrteam';
function RemoteStreamsBox() {
  const [transceiver, setTransceiver]=useState<RTCRtpTransceiver[]>([])
  function render() {
    console.log('RENDER', getRemoteStreams())
    setTransceiver(getRemoteStreams())
  }
  useEffect(()=>{
    glagol.setRendering(render)
  })
  return <div>
    {transceiver.map((transceiver)=>{
      return <RemoteStream transceiver={transceiver} />
    })}
  </div>
}
export {RemoteStreamsBox}
