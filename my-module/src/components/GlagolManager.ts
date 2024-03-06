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

  constructor(webRtc: RTCPeerConnection,
    xmpp: any,
    params: {
      videoQuality: MediaTrackConstraints,
      cameraIsWorking: boolean,
      microphoneIsWorking: boolean
    }) {
    this.webRtc = webRtc
    this.xmpp = xmpp
    this.cameraIsWorking = params.cameraIsWorking
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

  switchOffCamerf() {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'video') {
          sender.track.enabled = false
        }
    })
  }

  appleConstaraints(params: TQuantity) {
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