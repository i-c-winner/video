function SharingStream(props: { sharingTransceiver: RTCRtpTransceiver | undefined }) {
 return  props.sharingTransceiver&& <p style={{color: 'red'}}>{props.sharingTransceiver.receiver.track.label}</p>
}

export { SharingStream };
