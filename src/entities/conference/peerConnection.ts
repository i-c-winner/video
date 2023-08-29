type Callback = (...args: any[]) => void
type Params = {
  audio: number,
  video: number,
  description: string
}

class PeerConnection {
  private static instance: any;
  pc: RTCPeerConnection;
  private listeners: {
    [key: string]: Callback[]
  };
  private currentTransceivers: {
    audio: number,
    video: number
  };
  private candidates: RTCIceCandidate[];

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
    this.currentTransceivers = {
      audio: 0,
      video: 0
    }
    this.candidates = []
    return PeerConnection.instance
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    console.log(this.pc, track)
    this.pc.addTrack(track, stream)
  }

  changeTranseivers(params: { audio: number, video: number }) {
    this.currentTransceivers.audio += params.audio
    this.currentTransceivers.video += params.video
    do {
      this.pc.addTransceiver('audio', { direction: 'recvonly' })
      this.currentTransceivers.audio -= 1
    } while (this.currentTransceivers.audio > 0)
    do {
      this.pc.addTransceiver('audio', {
        direction: 'recvonly'
      })
      this.currentTransceivers.video -= 1
    } while (this.currentTransceivers.video > 0)
  }

  setCandidate(candidate: RTCIceCandidate) {
    this.candidates.push(candidate)
  }

  setRemoteDescripton(params: Params) {
    this.changeTranseivers({ audio: params.audio, video: params.video })
    this.pc.setRemoteDescription(JSON.parse(atob(params.description))).then(() => {
      while (this.candidates.length > 0) {
        const candidate = this.candidates.shift()
        this.pc.addIceCandidate(candidate)
      }
    })
    this.createAnswer()
  }

  createAnswer() {

    this.pc.createAnswer({
      iceRestart: true
    }).then((answer: any) => {
      this.pc.setLocalDescription(answer)
      const answer64 = btoa(JSON.stringify({ answer }))
      // doSignaling(answer64)
    })
  }
}

export { PeerConnection }
