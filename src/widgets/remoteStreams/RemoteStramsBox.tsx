import { glagol } from '../../shared/conference/glagol';
import {getRemoteTransceivers} from '../../features/room/streams';
import { useEffect, useState } from 'react';
import { RemoteStream } from './RemoteStream';
function RemoteStreamsBox() {
  const [transceiver, setTransceiver]=useState<RTCRtpTransceiver[]>([])
  function render() {
    setTransceiver(getRemoteTransceivers())
  }
  useEffect(()=>{
    glagol.setRendering(render)
  }, [])
  return <div>
    {transceiver.map((transceiver)=>{
      return <RemoteStream transceiver={transceiver} />
    })}
  </div>
}
export {RemoteStreamsBox}
