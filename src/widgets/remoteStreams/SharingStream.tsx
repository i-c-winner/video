function SharingStream(props: {sharingTransceiver: RTCRtpTransceiver}) {
  return <p>{props.sharingTransceiver.receiver.track.label}</p>
}

export {SharingStream}
