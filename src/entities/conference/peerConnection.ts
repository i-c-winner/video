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
    this.pc.ontrack = (event: RTCTrackEvent) => {
      const type = event.track.kind;
      const id = event.streams[0].id.split('/')[1];
      if (!glagol.currentStreams[id]) {
        if (id !== undefined) {
          glagol.currentStreams[id] = {
            audio: null,
            video: null,
            stream: event.streams[0]
          };
        }
      }
      if (id !== undefined) {
        if (type === "audio") glagol.currentStreams[id].audio = event.track;
        if (type === "video") glagol.currentStreams[id].video = event.track;
      }
      this.emit("setStreamId", event);
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

  addTrack(track: MediaStreamTrack) {
    this.pc.addTrack(track);
  }
getPeerConnection(){
    return this.pc
}
  changeTranseivers(params: { audio: number, video: number }) {
    this.currentTransceivers.audio += params.audio;
    this.currentTransceivers.video += params.video;
    do {
      this.pc.addTransceiver('audio', { direction: 'recvonly' });
      this.currentTransceivers.audio -= 1;
    } while (this.currentTransceivers.audio > 0);
    do {
      this.pc.addTransceiver('audio', {
        direction: 'recvonly'
      });
      this.currentTransceivers.video -= 1;
    } while (this.currentTransceivers.video > 0);
  }

  pushCandidate(candidate: RTCIceCandidate) {
    this.candidates.push(candidate);
  }

  setRemoteDescripton(params: {
    audio: number,
    video: number,
    description: string
  }) {
    this.changeTranseivers({ audio: params.audio, video: params.video });
    this.pc.setRemoteDescription(JSON.parse(atob(params.description))).then(() => {
      while (this.candidates.length > 0) {
        const candidate = this.candidates.shift();
        this.pc.addIceCandidate(candidate);
      }
    });
    this.createAnswer();
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
        track.enabled = state
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

  emit(name: string, ...args: any[]) {
    if (this.listeners[name] === undefined) {
      new Error(`Listener ${name} не сущевствуте`);
    } else {
      this.listeners[name].forEach((listener) => listener(args));
    }

  }
}

export { PeerConnection };
