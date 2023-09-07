import { PeerConnection } from "../entities/conference/peerConnection";
import { Xmpp } from "../entities/conference/xmpp";
import { glagol } from "../entities/glagol/glagol";
import { doSignaling } from "./index";


class Conference {
  private peerConnection: PeerConnection;
  private xmpp: Xmpp;

  constructor() {
    this.peerConnection = new PeerConnection('https://xmpp.prosolen.net:5281/http-bind');
    this.xmpp = new Xmpp();
    this.addCallbacks();
  }

  getPeerConnection() {
    return this.peerConnection;
  }

  initPeerConnection() {
    return new Promise((resolve: any, reject: any) => {
      resolve(this.xmpp.init('https://xmpp.prosolen.net:5281/http-bind'));
    });
  }

  xmppRegistering() {
    this.xmpp.register(glagol.userNode);
  }

  addTrack(track: MediaStreamTrack) {
    this.peerConnection.addTrack(track);
  }

  send(message: any) {
    this.xmpp.connection.send(message);
  }

  changeQualityVideo(type: 'VIDEO_HEIGHT' | 'VIDEO_MIDDLE' | 'VIDEO_LOW' | 'disabled' ) {
    this.peerConnection.changeConstraints(type);
  }
  changeAudio(state: boolean){
    this.peerConnection.changeAudio(state)
  }
  addCallbacks() {
    this.XmppOn('addTrack', (params: [ {
      audio: number,
      video: number,
      description: string
    } ]) => {
      this.peerConnection.setRemoteDescripton(params[0]);
    });
    this.XmppOn('iceCandidate', (description: [ string ]) => {
      const candidate = JSON.parse(atob(description[0]));
      const icecandidate = new RTCIceCandidate(candidate);
      if (this.peerConnection.pc.remoteDescription) {
        this.peerConnection.pc.addIceCandidate(icecandidate);
      } else {
        this.peerConnection.pushCandidate(icecandidate);
      }
    });
    this.peerConnectionOn("sendAnswer", (answer) => {
      this.send(doSignaling(answer[0]));
      // doSignaling(answer[0])
    });
    this.XmppOn('removeTrack', (params: [ {
      audio: number,
      video: number,
      description: string
    } ]) => {
      this.peerConnection.setRemoteDescripton(params[0]);
    });
  }

  XmppOn(name: string, callback: (...args: any[]) => void) {
    this.xmpp.on(name, callback);
  }

  peerConnectionOn(name: string, callback: (...args: any[]) => void) {
    this.peerConnection.on(name, callback);
  }
}

export { Conference };
