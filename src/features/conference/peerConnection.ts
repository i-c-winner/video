import { TCallbackConference } from '../../app/types';

class PeerConnection {
  private peerConnection: RTCPeerConnection;
  private static instance: any;
  private listeners: {
    [key: string]: TCallbackConference[]
  };

  constructor() {
    if (!PeerConnection.instance) {
      PeerConnection.instance = this;
    }
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    });
    this.listeners = {};
    // @ts-ignore
    window.peer=this.peerConnection
    this.addHandlers()
    return PeerConnection.instance;
  }

  addHandlers() {
    this.peerConnection.ontrack = (event) => {
      console.log(event, 'PEERCONNECTION ON TRACK');
    };
    this.peerConnection.onicecandidate = (event) => {
      console.log(event, 'PEERCONECTION ONICE CANDIDATE');
    };
  }

  setLocalStream() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).then((stream) => {
      stream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track);
      });
    });
    this.emit('localStreamDepended')
  }

  on(name: string, callback: TCallbackConference) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }

  emit(name: string, args?: TCallbackConference[]) {
    if (!this.listeners[name]) {
      console.error(new Error(`Слушатель ${name} не существует`));
    } else {
      this.listeners[name].forEach((listener)=>{
        listener(name, args)
      })
    }
  }
}

const peerConnection = new PeerConnection();
export { peerConnection };
