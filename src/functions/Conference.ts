import { PeerConnection } from "../entities/conference/peerConnection";
import { Xmpp } from "../entities/conference/xmpp";
import { glagol } from "../entities/glagol/glagol";
import { doSignaling } from "./index";
import { Callback } from 'webpack-cli';


class Conference {
  private peerConnection: PeerConnection;
  private xmpp: Xmpp;

  constructor() {
    this.peerConnection = new PeerConnection('https://xmpp.prosolen.net:5281/http-bind');
    this.xmpp = new Xmpp();
    this.addCallbacks();
  }

  getPeerConnection() {
    return this.peerConnection.getPeerConnection();
  }

  initPeerConnection() {
    return new Promise<unknown>((resolve, reject) => {
      resolve(this.xmpp.init('https://xmpp.prosolen.net:5281/http-bind'));
    });
  }

  xmppRegistering() {
    this.xmpp.register(glagol.userNode);
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    this.peerConnection.getPeerConnection().addTrack(track, stream);
  }

  send(message: Strophe.Builder) {
    this.xmpp.connection.send(message);
  }

  changeQualityVideo(type: 'height' | 'middle' | 'low' | 'disabled') {
    this.peerConnection.changeConstraints(type);
  }

  changeAudio(state: boolean) {
    this.peerConnection.changeAudio(state);
  }

  addCallbacks() {
    this.XmppOn('addTrack', (description: [string]) => {
      this.peerConnection.setRemoteDescripton(description[0]);
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
    });
    this.XmppOn('removeTrack', (description: [string]) => {
      this.peerConnection.setRemoteDescripton(description[0]);
    });
  }

  leaveRoom() {
    this.peerConnection.exit();
  }

  XmppOn(name: string, callback: (...args: any[]) => void) {
    this.xmpp.on(name, callback);
  }

  peerConnectionOn(name: string, callback: (...args: any[]) => void) {
    this.peerConnection.on(name, callback);
  }
  peerConnectionOff(name: string, callback: Callback<any>) {
    this.peerConnection.off(name, callback)
  }
}
const conference= new Conference()
export { conference };
