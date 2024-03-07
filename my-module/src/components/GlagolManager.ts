import { TQuantity } from "./types";

const videoQuantity = {
  height: {
    width: 800,
    height: 520,
    frameRate: 60
  },
  middle: {
    width: 640,
    height: 480,
    frameRate: 50,
  },
  low: {
    width: 320,
    height: 240,
    frameRate: 30
  },
}

class GlagolManager {
  private webRtc: RTCPeerConnection
  private xmpp: any;
  private cameraIsWorking: boolean
  private currentCameraQuantity: TQuantity
  private microponeIsWorking: boolean;

  constructor(webRtc: RTCPeerConnection,
    xmpp: any,
) {
    this.webRtc = webRtc
    this.xmpp = xmpp
    this.cameraIsWorking = true
      this.microponeIsWorking=true
    this.currentCameraQuantity = 'low'
  }


  switchOnCamera() {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'video') {
          sender.track.enabled = true
        }
    })
  }

  switchOffCamera() {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'video') {
          sender.track.enabled = false
        }
    })
  }
  switchOffMic() {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'audio') {
          sender.track.enabled = false
        }
    })
  }

  applyConstraints(params: TQuantity) {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'video') {
          sender.track.applyConstraints(videoQuantity[this.currentCameraQuantity])
        }
    })
  }

  getStateCamera() {
    return this.cameraIsWorking
  }
}

export { GlagolManager }