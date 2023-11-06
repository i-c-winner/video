import { glagol } from '../../shared/conference/glagol';
import {getRemoteTransceivers} from '../../features/room/streams';
import { useEffect, useState } from 'react';
import { RemoteStream } from './RemoteStream';
function RemoteStreamsBox(props: {transceivers: RTCRtpTransceiver[]}) {
  return <div>
    {props.transceivers.map((transceiver)=>{
      return <RemoteStream transceiver={transceiver} />
    })}
  </div>
}
export {RemoteStreamsBox}
