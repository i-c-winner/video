function RemoteStream(props: {transceiver: RTCRtpTransceiver}) {
  return (
    <div>
      <p>{props.transceiver.receiver.track.label}</p>
      <hr/>
    </div>

  )
}
export {RemoteStream}
