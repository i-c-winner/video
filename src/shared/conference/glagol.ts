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
  peerConnection:  new RTCPeerConnection({
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
  createConference: ()=>{
   const connection= new Promise<any>((resolve, reject) => {
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
    })
    return connection
  },

  connectionAddHandlers: () => {
    const handlerMessage = (stanza: Element) => {
      const bodyText = Strophe.getText(stanza.getElementsByTagName('body')[0]);
      const jimble = stanza.getElementsByTagName('jimble')[0];
      const jimbleText = Strophe.getText(jimble);
      console.log(bodyText, 'BODY TEXT');
      switch (bodyText) {
        case 'add_dashboard': {
          console.log("ADD_DASHBOARD");

          break;
        }
        case 'add_track': {

          break;
        }
        case 'ice_candidate': {

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

          }

          break;
        }
        case 'send_dashboard': {
          console.log('SEND DASHBOARD');

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
      console.log('INVITE')
      const from = stanza.getAttribute('from');

       glagol.roomInstance.invite()

      return true;
    };
    const handlerPresence = (stanza: Element) => {
      const jingle = stanza.getElementsByTagName('jingle');
      try {
        if (jingle[0].getAttribute('action') === "enter_to_room") {
          const x = stanza.getElementsByTagName('x');
          try {
            const statuses: Element[] = Array.from(x[1].getElementsByTagName('status'));
            if (statuses[0] !== null) {
              if (Number(statuses[0].getAttribute('code')) === 201) {
                glagol.roomInstance.validate()
              } else if (Number(statuses[0].getAttribute('code')) === 100) {

              }
            }

          } catch (e) {
          }
        }
      } catch (e) {
      }
      const type = stanza.getAttribute('type');
      const from = stanza.getAttribute('from') as string;
      console.log(stanza, 'PESENCE');
      return true;
    };
    glagol.connection.addHandler(handlerMessage, null, 'message',);
    glagol.connection.addHandler(handlerIqTypeResult, null, 'iq', 'result');
    glagol.connection.addHandler(handlerPresence, null, 'presence');
  },
  peerConnectionAddHandlers() {
    const pc=glagol.peerConnection
    pc.ontrack=(event)=>{
      console.log(event, 'ONTRACK')
    }
    pc.onicecandidate=(event)=>{
      console.log(event, 'iceCandidate')
    }
  },
  roomInstance: {
    create: () => {
     return  room.create(glagol, glagol.params.roomName, glagol.params.userNode);
    },
    validate: () => {
      room.validate(glagol, glagol.params.roomName, glagol.params.userNode);
    },
    invite: () => {
      room.invite(glagol, glagol.params.roomName, glagol.params.displayName);
    }
  },
  setLocalStream: () => {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
  },
  sendMessage: function (message) {
    this.connection.send(message)
  }
};
export { glagol };
