import * as strophe from "strophe.js";
import { setRegister } from "../plugins/rigester";
import { Glagol } from "./Glagol";
import { IOptions } from "./types";
import { getRandomText } from "../plugins/getRandomText";

setRegister(strophe);
// @ts-ignore
const { Strophe } = strophe;

class CreaterGlagol {
  private glagol: any;
  private CreaterGlagol: any;

  static handlers: {
    [key: string]: ((...args: any[]) => void)[];
  } = {};

  private xmpp: any;
  private readonly roomName: string;
  private readonly userNode: string;
  private readonly emit: (name: string, ...args: any[]) => void;
  static setHandler = function (
    name: string,
    handler: (...args: any[]) => void,
  ) {
    if (!CreaterGlagol.handlers[name]) CreaterGlagol.handlers[name] = [];
    CreaterGlagol.handlers[name].push(handler);
  };
  private static instance: any;
  private displayName: string;
  private strophe: Strophe.Connection;
  private webRtc: RTCPeerConnection;

  constructor(props: IOptions) {
    this.emit = (name: string, ...args: any[]) => {
      try {
        CreaterGlagol.handlers[name].forEach((handler) => {
          handler(args);
        });
      } catch (e) {
        console.info(`Listener ${name} note found: `, e);
      }
    };
    this.strophe = new Strophe.Connection(props.xmppUrl);
    this.webRtc = new RTCPeerConnection(props.webUrl);
    this.roomName = props.roomName;
    this.userNode = getRandomText(5);
    this.displayName = props.displayName;
    this.webRtc.ondatachannel = (event: RTCDataChannelEvent) =>
      this.glagol.pcHandlerDataChannel(event);
    this.webRtc.onicecandidate = (event: RTCPeerConnectionIceEvent) =>
      this.glagol.pcHandlerIceCandidate(event);
    this.webRtc.ontrack = (event: RTCTrackEvent) =>
      this.glagol.pcHandlerOnTrack(event);
  }

  createGlagol() {
    this.glagol = new Glagol({
      xmpp: this.strophe,
      webRtc: this.webRtc,
      userNode: this.userNode,
      roomName: this.roomName,
      displayName: this.displayName,
      handlers: CreaterGlagol.handlers,
    });
    this.glagol.addHandlers();
  }

  register() {
    this.glagol.register().then((result: any) => {
      this.emit("connectionOn");
      if (result) this.glagol.createRoom();
      this.emit("connectionOn");
    });
  }

  xmppHandlerMessage(stanza: Element) {
    this.glagol.xmppHandlerMessage(stanza);
    return true;
  }

  xmppHandlerPresence(stanza: Element) {
    this.glagol.xmppHandlerPresence(stanza);
    return true;
  }

  xmppHandlerIqTypeResult(stanza: Element) {
    this.glagol.xmppHandlerIqTypeResult(stanza);
    return true;
  }

  getGlagol() {
    return this.glagol;
  }
}

export default CreaterGlagol;
