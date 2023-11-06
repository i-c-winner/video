function RemoteStream(props: {transceiver: RTCRtpTransceiver}) {
  return <p>{props.transceiver.receiver.track.label}</p>
}
export {RemoteStream}
