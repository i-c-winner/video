import { getRandomText } from '../../features/plugins/getRandomText';
import * as strophe from 'strophe.js';
import { setRegister } from '../../features/plugins/register';
import { IGlagol } from '../index';
// import { glagol } from '../../app/constants/glagol';
import { Room } from '../room/room';

const room = new Room();
setRegister(strophe);
// @ts-ignore
const { Strophe } = strophe;
const glagol: IGlagol = {
  peerConnection: new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  }),
  params: {
    userNode: getRandomText(5),
    roomName: getRandomText(5),
    displayName: getRandomText(5)
  },
  connection: new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind'),
  createConference: () => {
    const connection = new Promise<any>((resolve, reject) => {
      const callback = (status: number): void => {
        if (status === Strophe.Status.REGISTER) {
          // fill out the fields
          glagol.connection.register.fields.username = glagol.params.userNode;
          glagol.connection.register.fields.password = getRandomText(5);
          // calling submit will continue the registration process
          glagol.connection.register.submit();
          //@ts-ignore
        } else if (status === Strophe.Status.REGISTERED) {
          console.info("registered!");
          // calling login will authenticate the registered JID.
          glagol.connection.authenticate();
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
          glagol.connectionAddHandlers();
          resolve(glagol.connection);
        } else {
          // Do other stuff
        }
      };
      glagol.connection.register.connect('prosolen.net', callback);
    });
    return connection;
  },

  connectionAddHandlers: () => {
    const handlerMessage = (stanza: Element) => {
      const bodyText = Strophe.getText(stanza.getElementsByTagName('body')[0]);
      const jimble = stanza.getElementsByTagName('jimble')[0];
      const jimbleText = Strophe.getText(jimble);
      switch (bodyText) {
        case 'add_dashboard': {
          glagol.streamsWasChanged(jimbleText);
          break;
        }
        case 'add_track': {
          glagol.streamsWasChanged(jimbleText);
          break;
        }
        case 'ice_candidate': {
          break;
        }
        case 'remove_track': {
          glagol.streamsWasChanged(jimbleText);
          break;
        }
        case 'offer_dashboard': {
          break;
        }
        case 'send_dashboard': {
          break;
        }
        case 'remove_dashboard': {
          glagol.streamsWasChanged(jimbleText);
          break;
        }

        default: {
          console.info('message with unknown action');
        }
      }
      console.log(stanza, 'message');
      return true;
    };
    const handlerIqTypeResult = (stanza: Element) => {
      const from = stanza.getAttribute('from');
      glagol.roomInstance.invite();
      return true;
    };
    const handlerPresence = (stanza: Element) => {
      const from = stanza.getAttribute('from') as string;
      const jingle = stanza.getElementsByTagName('jingle');
      try {
        if (jingle[0].getAttribute('action') === "enter_to_room") {
          const x = stanza.getElementsByTagName('x');
          try {
            const statuses: Element[] = Array.from(x[1].getElementsByTagName('status'));
            if (statuses[0] !== null) {
              if (Number(statuses[0].getAttribute('code')) === 201) {
                glagol.roomInstance.validate();
              } else if (Number(statuses[0].getAttribute('code')) === 100) {
                glagol.roomInstance.invite();
              }
            }

          } catch (e) {
          }
        }
      } catch (e) {
      }
      const type = stanza.getAttribute('type');

      console.log(stanza, 'PESENCE');
      return true;
    };
    glagol.connection.addHandler(handlerMessage, null, 'message',);
    glagol.connection.addHandler(handlerIqTypeResult, null, 'iq', 'result');
    glagol.connection.addHandler(handlerPresence, null, 'presence');
    const message = new Strophe.Builder('presence');
    glagol.sendMessage(message);
  },
  streamsWasChanged(description) {
    this.peerConnection.setRemoteDescription(JSON.parse(atob(description))).then(() => {
      return this.peerConnection.createAnswer({
        iceRestart: true
      });
    }).then((answer) => {
      const answer64 = btoa(JSON.stringify({ answer }));
      this.peerConnection.setLocalDescription(answer);
      const message: Strophe.Builder = new Strophe.Builder('message', {
        to: `${this.params.roomName}@conference.prosolen.net/focus`,
        type: 'chat'
      }).c('body').t(answer64);
      this.sendMessage(message);
      if  (this.renderingFunction!==undefined) this.renderingFunction()
    }).catch(() => {
      console.error(new Error('error'));
    });

  },
  peerConnectionAddHandlers() {
    const pc = glagol.peerConnection;
    // @ts-ignore
    window.peer = pc;
    pc.ontrack = (event) => {
      event.streams[0].onremovetrack = (event) => {
      };
    };
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const candidate = btoa(JSON.stringify({ candidate: event.candidate }));
        const message = new Strophe.Builder('message', {
          to: `${this.params.roomName}@conference.prosolen.net/focus`,
          type: 'chat'
        }).c('body').t(candidate);
        this.sendMessage(message);
      }
    };
  },
  roomInstance: {
    create: () => {
      return room.create(glagol.sendMessage, glagol.params.roomName, glagol.params.userNode);
    },
    validate: () => {
      room.validate(glagol.sendMessage, glagol.params.roomName, glagol.params.userNode);
    },
    invite: () => {
      room.invite(glagol.sendMessage, glagol.params.roomName, glagol.params.displayName);
    }
  },
  setLocalStream: () => {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
  },
  sendMessage: function (message) {
    glagol.connection.send(message);
  },
  setRendering: function (render) {
    this.renderingFunction = render;
  }
};
export { glagol };
