import * as strophe from 'strophe.js';
import { setRegister } from '../plugins/register';
import { getRandomText } from '../plugins/getRandomText';
import React from 'react';
import { TCallbackConference } from '../../app/types';


// @ts-ignore
const { Strophe } = strophe;
setRegister(strophe);
const userNode = getRandomText(5);
const password = getRandomText(8);

class Xmpp {
  public connection: any;
  private room: any;
  private listeners: {
    [key: string]: TCallbackConference[]
  };
  private roomName: string;

  constructor() {
    this.roomName = '';
    this.connection = new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind');
    this.listeners = {};
  }

  init(roomName: string, displayName: string) {
    this.roomName = roomName;
    return new Promise((resolve, reject) => {
      const callback = (status: number): void => {
        if (status === Strophe.Status.REGISTER) {
          // fill out the fields
          this.connection.register.fields.username = userNode;
          this.connection.register.fields.password = password;
          // calling submit will continue the registration process
          this.connection.register.submit();
          //@ts-ignore
        } else if (status === Strophe.Status.REGISTERED) {
          console.info("registered!");
          // calling login will authenticate the registered JID.
          this.connection.authenticate();
          //@ts-ignore
        } else if (status === Strophe.Status.CONFLICT) {
          console.info("Contact already existed!");
          //@ts-ignore
        } else if (status === Strophe.Status.NOTACCEPTABLE) {
          console.info("Registration form not properly filled out.");
          //@ts-ignore
        } else if (status === Strophe.Status.REGIFAIL) {
          console.info("The Server does not support In-Band Registration");
        } else if (status === Strophe.Status.CONNECTED) {
          console.info('connected', this.connection);
          resolve(this);
        } else {
          // Do other stuff
        }
      };
      this.connection.register.connect('prosolen.net', callback);
    });

  }
  addHandlers=()=> {
    this.connection.addHandler(this.handlerMessage, null, 'message', )
    this.connection.addHandler(this.handlerIqTypeResult, null, 'iq', 'result')
    this.connection.addHandler(this.handlerPresence, null, 'presence')
    this.connection.addHandler((stanza: Element) => {
      console.log(stanza, 'THIS IS STANZA!!!!!!!!!!!!!!!!!!!');
    });
  }

  handlerMessage = (stanza: Element) => {
    const bodyText = Strophe.getText(stanza.getElementsByTagName('body')[0]);
    const jimble = stanza.getElementsByTagName('jimble')[0];
    const jimbleText = Strophe.getText(jimble);
    switch (bodyText) {
      case 'add_dashboard': {
        console.log("ADD_DASHBOARD");
        this.emit('renderSharingScreen', bodyText);
        this.emit('addTrack', jimbleText);
        break;
      }
      case 'add_track': {
        this.emit('addTrack', jimbleText);
        break;
      }
      case 'ice_candidate': {
        this.emit("iceCandidate", jimbleText);
        break;
      }
      case 'remove_track': {
        const video: number = Number(jimble.getAttribute('video'));
        const audio: number = Number(jimble.getAttribute('audio'));
        const id = jimble.getAttribute('id_remote') as string;
        break;
      }
      case 'offer_dashboard': {
        if (jimble.getAttribute('ready')) {
          this.emit('startSharing');
        }

        break;
      }
      case 'send_dashboard': {
        console.log('SEND DASHBOARD');
        this.emit('renderSharingScreen', bodyText);
        break;
      }

      default: {
        console.info('message with unknown action');
      }
    }
    console.log(stanza, 'message');
    return true;
  };
  handlerIqTypeResult = (stanza: Element) => {
    const from = stanza.getAttribute('from');
    if (from === `${this.roomName}@conference.prosolen.net`) {
      this.emit('doInviteRoom');
    }
    return true;
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
              // Xmpp.instance.emit("validateRoom");
              this.emit('doValidateRoom');
            } else if (Number(statuses[0].getAttribute('code')) === 100) {
              this.emit('doInviteRoom');
              // Xmpp.instance.emit("inviteRoom");
            }
          }

        } catch (e) {
        }
      }
    } catch (e) {
    }
    const type = stanza.getAttribute('type');
    const from = stanza.getAttribute('from') as string;
    // if ((type === 'unavailable') && (from.split('/')[1] === glagol.userNode)) {
    //   this.emit('leaveRoom');
    // }
    console.log(stanza, 'PESENCE');
    return true;
  };

  sendMessage(message: Strophe.Builder) {
    const message64 = btoa(JSON.stringify(message));
    this.connection.send(message);
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
      this.listeners[name].forEach((listener) => {
        listener(name, args);
      });
    }
  }
}

const xmpp = new Xmpp();
export { xmpp };
