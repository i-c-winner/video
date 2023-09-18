import * as strophe from "strophe.js";
import { setRegister } from "../../shared/lib/setRegister";
import { getRandomText } from "../../shared/lib/getRandomText";
import { glagol } from '../glagol/glagol';

const { Strophe }: any = strophe;
setRegister(strophe);

type Callback = (...args: unknown[]) => void

class Xmpp {
  public connection: any;
  private static instance: Xmpp;
  private listeners: {
    [key: string]: Callback[]
  };

  constructor() {
    if (!Xmpp.instance) {
      Xmpp.instance = this;
    }
    this.listeners = {};

    return Xmpp.instance;
  }

  init(url: string) {
    this.connection = new Strophe.Connection(url);
    return this.connection;
  }

  register = (userNode: string) => {

    const callback = (status: number) => {
      //@ts-ignore
      if (status === Strophe.Status.REGISTER) {
        // fill out the fields
        this.connection.register.fields.username = userNode;
        this.connection.register.fields.password = getRandomText(8);
        // calling submit will continue the registration process
        this.connection.register.submit();
        //@ts-ignore
      } else if (status === Strophe.Status.REGISTERED) {
        console.log("registered!");
        // calling login will authenticate the registered JID.
        this.connection.authenticate();
        //@ts-ignore
      } else if (status === Strophe.Status.CONFLICT) {
        console.log("Contact already existed!");
        //@ts-ignore
      } else if (status === Strophe.Status.NOTACCEPTABLE) {
        console.log("Registration form not properly filled out.");
        //@ts-ignore
      } else if (status === Strophe.Status.REGIFAIL) {
        console.log("The Server does not support In-Band Registration");
      } else if (status === Strophe.Status.CONNECTED) {
        console.log('connected');
        this.connection.addHandler(this.handlerPresence, null, 'presence');
        this.connection.addHandler(this.handlerMessage, null, 'message');
        this.connection.addHandler(this.handlerIqTypeResult, null, "iq", "result");
        this.connection.addHandler(this.handlerMessageGroupChat, null, 'message', 'groupchat');
        this.emit("createRoom");
        // do something after successful authentication
      } else {
        // Do other stuff
      }
    };
    this.connection.register.connect("prosolen.net", callback);
  };

  handlerPresence = (stanza: Element) => {
    const jingle = stanza.getElementsByTagName('jingle');
    try {
      if (jingle[0].getAttribute('action') === "enter_to_room") {
        const x = stanza.getElementsByTagName('x');
        try {
          const statuses: Element[] = Array.from(x[1].getElementsByTagName('status'));
          if (statuses[0] !== null) {
            if (Number(statuses[0].getAttribute('code')) === 201) {
              Xmpp.instance.emit("validateRoom");
            } else if (Number(statuses[0].getAttribute('code')) === 100) {
              Xmpp.instance.emit("inviteRoom");
            }
          }

        } catch (e) {
        }
      }
    } catch (e) {
    }
    const type = stanza.getAttribute('type');
    const from = stanza.getAttribute('from') as string;
    if ((type === 'unavailable') && (from.split('/')[1] === glagol.userNode)) {
      this.emit('leaveRoom');
    }
    return true;
  };

  handlerMessage = (stanza: Element) => {
    const bodyText = Strophe.getText(stanza.getElementsByTagName('body')[0]);
    const jimble = stanza.getElementsByTagName('jimble')[0];
    const jimbleText = Strophe.getText(jimble);
    if (bodyText === "add_track") {
      const video: number = Number(jimble.getAttribute('video'));
      const audio: number = Number(jimble.getAttribute('audio'));


      this.emit('addTrack', {
        audio: audio * (-1),
        video: video * (-1),
        description: jimbleText
      });
    } else if (bodyText === "ice_candidate") {
      console.log(stanza);
      this.emit("iceCandidate", jimbleText);
    } else if (bodyText === "remove_track") {
      const video: number = Number(jimble.getAttribute('video'));
      const audio: number = Number(jimble.getAttribute('audio'));

      const id = jimble.getAttribute('id_remote') as string;
      this.emit('deleteStreamId', id.split('/')[1]);
      this.emit('removeTrack', {
        audio,
        video,
        description: jimbleText
      });
    }

    console.log(stanza, "Message");
    return true;
  };

  handlerIqTypeResult = (stanza: Element) => {
    this.emit("inviteRoom");
    return true;
  };
  handlerMessageGroupChat = (stanza: Element) => {
    this.emit('messageWasReceived', stanza);
    return true;
  };

  getConnection() {
    return this.connection;
  }

  on(name: string, callback: Callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }

  emit(name: string, ...args: unknown[]) {
    if (this.listeners[name]) {
      new Error(`Listener ${name} не сущевствуте`);
    }
    this.listeners[name].forEach((listener) => listener(args));
  }
}

export { Xmpp };
