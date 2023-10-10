import { glagol } from "../glagol/glagol";
import { constants } from '../../shared/config/constants';

type Callback = (...args: unknown[]) => void

class PeerConnection {
  private static instance: PeerConnection;
  pc: RTCPeerConnection;
  private listeners: {
    [key: string]: Callback[]
  };
  private currentTransceivers: {
    audio: number,
    video: number
  };
  private candidates: RTCIceCandidate[];
  public loop: string | null;

  constructor(urls: string) {
    if (!PeerConnection.instance) {
      PeerConnection.instance = this;
    }
    this.loop = null;
    this.listeners = {};
    this.pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    });
    // @ts-ignore
    window.peer = this.pc;
    this.pc.ontrack = (event: RTCTrackEvent) => {
      this.emit('renderRemoteBox');
    };

    this.pc.onicecandidate = ((event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        const candidate64 = btoa(JSON.stringify({
          candidate: event.candidate
        }));
        this.emit("sendAnswer", candidate64);
      }
    });
    this.currentTransceivers = {
      audio: 0,
      video: 0
    };
    this.candidates = [];
    return PeerConnection.instance;
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    this.pc.addTrack(track, stream);
  }

  getPeerConnection() {
    return this.pc;
  }
  pushCandidate(candidate: RTCIceCandidate) {
    this.candidates.push(candidate);
  }

  setRemoteDescripton(description: string) {
    this.pc.setRemoteDescription(JSON.parse(atob(description))).then(() => {
      while (this.candidates.length > 0) {
        const candidate = this.candidates.shift();
        this.pc.addIceCandidate(candidate);
      }
    });
    this.createAnswer();
    this.emit('renderRemoteBox');
    this.emit('renderSharingScreen')
  }

  changeConstraints(quality: "height" | "middle" | "low" | 'disabled') {
    glagol.localStreamForPeer?.getTracks().forEach((track) => {
      if (track.kind === 'video') {
        if (quality === "disabled") {
          track.enabled = false;
        } else {
          track.enabled = true;
          track.applyConstraints(constants.videoQuantity[quality]);
        }
      }
    });
  }

  changeAudio(state: boolean) {
    glagol.localStreamForPeer?.getTracks().forEach((track) => {
      if (track.kind === 'audio') {
        track.enabled = state;
      }
    });
  }

  exit() {
    this.pc.close();
    this.emit('leaveRoom');
  }

  createAnswer() {
    this.pc.createAnswer({
      iceRestart: true
    }).then((answer: RTCLocalSessionDescriptionInit) => {
      this.pc.setLocalDescription(answer);
      const answer64 = btoa(JSON.stringify({ answer }));
      this.emit("sendAnswer", answer64);
    });
  }


  on(name: string, callback: Callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }

  off(name: string, callBack: Callback) {
    this.listeners[name].filter((listener) => listener === callBack);
  }

  emit(name: string, ...args: any[]) {
    if (this.listeners[name] === undefined) {
      new Error(`Listener ${name} не сущевствуте`);
    } else {
      this.listeners[name].forEach((listener) => listener(args));
    }
  }
}

export { PeerConnection };
