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
  private handlers: {
    [key: string]: ((...args: any[]) => void)[]
  }

  constructor(webRtc: RTCPeerConnection,
    xmpp: any,
  ) {
    this.webRtc = webRtc
    this.xmpp = xmpp
    this.cameraIsWorking = true
    this.microponeIsWorking = true
    this.currentCameraQuantity = 'low'
    this.handlers={}
  }


  switchOnCamera() {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'video') {
          sender.track.enabled = true
        }
    })
    this.cameraIsWorking=true
    this.emit('cameraSwitchOn')
  }

  switchOffCamera() {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'video') {
          sender.track.enabled = false
        }
    })
    this.cameraIsWorking=false
    this.emit('cameraSwitchOff')
  }

  switchOffMic() {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'audio') {
          sender.track.enabled = false
        }
    })
    this.microponeIsWorking=false
    this.emit('microphoneSwitchOff')
  }
  switchOnMic() {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'audio') {
          sender.track.enabled = true
        }
    })
    this.microponeIsWorking=true
    this.emit('microphoneSwitchOn')
  }

  applyConstraints(params: TQuantity) {
    this.webRtc.getSenders().forEach((sender) => {
      if (sender.track !== null)
        if (sender.track.kind === 'video') {
          sender.track.applyConstraints(videoQuantity[this.currentCameraQuantity])
        }
    })
    this.microponeIsWorking=false
  }

  getStateCamera() {
    return this.cameraIsWorking
  }
  getStateMic() {
    return this.microponeIsWorking
  }

  setHandler(name: string, handler: (...args: any[]) => void) {
    if (!this.handlers[name]) {
      this.handlers[name] = []
    }
    this.handlers[name].push(handler)
  }

  emit = (name: string, ...args: any[]) => {
    try {
      this.handlers[name].forEach((handler: (...args: any[])=>void) => {
        handler(args);
      });
    } catch (e) {
      console.info(`Listener ${name} note found: `, e);
    }

  };
}

export { GlagolManager }