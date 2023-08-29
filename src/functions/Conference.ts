import { PeerConnection } from "../entities/conference/peerConnection";
import { Xmpp } from "../entities/conference/xmpp";
import { glagol } from "../entities/glagol/glagol";
import {doSignaling} from "./index";


class Conference {
  private peerConnection: PeerConnection;
  private xmpp: Xmpp;

  constructor() {
    this.peerConnection = new PeerConnection('https://xmpp.prosolen.net:5281/http-bind')
    this.xmpp = new Xmpp()
    this.addCallbacks()
  }

  initPeerConnection() {
    return new Promise((resolve: any, reject: any) => {
      resolve(this.xmpp.init('https://xmpp.prosolen.net:5281/http-bind'))
    })
  }

  xmppRegistering() {
    this.xmpp.register(glagol.userNode)
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    this.peerConnection.addTrack(track, stream)
  }

  send(message: any) {
    this.xmpp.connection.send(message)
  }

  addCallbacks() {
    this.XmppOn('addTrack', (params: [ {
      audio: number,
      video: number,
      description: string
    } ]) => {
      this.peerConnection.setRemoteDescripton(params[0])
    })
    this.XmppOn('iceCandidate', (description: [ string ]) => {
      const candidate = JSON.parse(atob(description[0]))
      const icecandidate = new RTCIceCandidate(candidate)
      if (this.peerConnection.pc.remoteDescription) {
        this.peerConnection.pc.addIceCandidate(icecandidate)
      } else {
        this.peerConnection.pushCandidate(icecandidate)
      }
    })
    this.peerConnectionOn("sendAnswer", (answer) => {
      this.send(doSignaling(answer[0]))
      // doSignaling(answer[0])
    })
  }

  XmppOn(name: string, callback: (...args: any[]) => void) {
    this.xmpp.on(name, callback)
  }
  peerConnectionOn(name: string, callback: (...args: any[]) => void) {
    this.peerConnection.on(name, callback)
  }
}

export { Conference }
