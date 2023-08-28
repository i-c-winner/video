import { PeerConnection } from "../entities/conference/peerConnection";
import { Xmpp } from "../entities/conference/xmpp";
import { glagol } from "../entities/glagol/glagol";


class Conference {
  private peerConnection: PeerConnection;
  private xmpp: Xmpp;

  constructor() {
    this.peerConnection = new PeerConnection('https://xmpp.prosolen.net:5281/http-bind')
    this.xmpp = new Xmpp()
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
XmppOn(name: string, callback: (...args: any[])=>void) {
    this.xmpp.on(name, callback)
}
}

export { Conference }
