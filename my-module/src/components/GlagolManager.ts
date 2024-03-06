class GlagolManager {
  private webRtc: RTCPeerConnection
  private xmpp: any;
  private cameraIsWorking: boolean
  constructor(webRtc: RTCPeerConnection,
    xmpp: any,
    params: {
      videoQuality: MediaTrackConstraints,
      cameraIsWorking: boolean,
      microphoneIsWorking: boolean
    }) {
    this.webRtc=webRtc
    this.xmpp=xmpp
    this.cameraIsWorking=params.cameraIsWorking
  }
  switchOnCamera() {
    this.webRtc.getSenders().forEach((sender)=>{
      if (sender.track!==null)
      if (sender.track.kind==='video') {
        sender.track.enabled=true
      }
    })
  }
  switchOffCamerf() {
    this.webRtc.getSenders().forEach((sender)=>{
      if (sender.track!==null)
        if (sender.track.kind==='video') {
        sender.track.enabled=false
      }
    })
  }
  appleConstaraints(params: MediaTrackConstraints) {
    this.webRtc.getSenders().forEach((sender)=>{
      if (sender.track!==null)
        if (sender.track.kind==='video') {
        sender.track.applyConstraints(params)
      }
    })
  }
  getStateCamera() {
    return this.cameraIsWorking
  }
}

export {GlagolManager}