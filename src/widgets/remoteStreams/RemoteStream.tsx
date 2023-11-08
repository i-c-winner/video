import { useEffect, useRef } from 'react';

function RemoteStream(props: {transceiver: RTCRtpTransceiver}) {
  const refVideo=useRef<HTMLVideoElement>(null)
  useEffect(()=>{
    if (refVideo.current!==null) {
      const stream=new MediaStream()
      stream.addTrack(props.transceiver.receiver.track)
      refVideo.current.srcObject=stream
    }
  })
  return (

    <div>
      <p>{props.transceiver.receiver.track.label}</p>
      <video autoPlay={true} ref={refVideo} />
      <hr/>
    </div>

  )
}
export {RemoteStream}
