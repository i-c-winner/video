import * as stream from "stream";

type Callback = (...args: any[]) => void

class PeerConnection {
  private static instance: any;
  pc: RTCPeerConnection;
  private listeners: {
    [key: string]: Callback[]
  };

  constructor(urls: string) {
    if (!PeerConnection.instance) {
      PeerConnection.instance = this
    }
    this.listeners = {}
    this.pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    })
    this.pc.ontrack = (event) => {
      console.log(event, "Event")
    }
    return PeerConnection.instance
  }
addTrack(track: MediaStreamTrack, stream: MediaStream){
    console.log(this.pc, track)
 this.pc.addTrack(track,stream)
}
  on(name: string, callback: Callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = []
    }
    this.listeners[name].push(callback)
  }

  emit(name: string, ...args: any[]) {
    this.listeners[name].forEach((listener) => listener(args))
  }
}

export { PeerConnection }
