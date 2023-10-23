import * as strophe from 'strophe.js';
import { setRegister } from '../plugins/register';
import { getRandomText } from '../plugins/getRandomText';
import React from 'react';


// @ts-ignore
const { Strophe } = strophe;
setRegister(strophe);
const userNode = getRandomText(5);
const password = getRandomText(8);

class Xmpp {
  public connection: any;
  private room: any;

  constructor() {
    this.connection = new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind');
  }

  init(room: any) {
    const callback = (status: number): void => {
      if (status === Strophe.Status.REGISTER) {
        // fill out the fields
        this.connection.register.fields.username = userNode;
        this.connection.register.fields.password = password;
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
        console.log('connected', this.connection);
        this.connection.addHandler(this.handlerPresence, null, 'presence');
        this.connection.addHandler(this.handlerMessage, null, 'message')
        this.connection.addHandler(this.handlerIqTypeResult, null, "iq", "result")
        this.connection.addHandler((stanza: Element)=>console.log(stanza, 'STANAAAAAA'))
        room.create();
        this.room=room
      } else {
        // Do other stuff
      }
    };
    this.connection.register.connect('prosolen.net', callback);
  }
handlerMessage=(stanza: Element)=> {
console.log(stanza, 'Stanza Message')
}
  handlerIqTypeResult=(stanza: Element)=> {
  this.room.invite()
  }
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
              this.room.validate()
            } else if (Number(statuses[0].getAttribute('code')) === 100) {
              this.room.invite()
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
    console.log(stanza, 'STANZA')
    return true;
  };
}

const xmpp = new Xmpp();
export { xmpp };
