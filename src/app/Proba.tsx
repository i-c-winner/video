import * as strophe from 'strophe.js';
import { setRegister } from '../features/plugins/register';
import { getRandomText } from '../features/plugins/getRandomText';

setRegister(strophe);
// @ts-ignore
const { Strophe } = strophe;
const roomName=getRandomText(5)
const userNode=getRandomText(5)
const displayName=getRandomText(5)

function Proba() {
  const connection = new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind');

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
      console.log('ADD_TRACK')
        break;
      }
      case 'ice_candidate': {
console.log('ICE CANDIDATE')
        break;
      }
      case 'remove_track': {
        const video: number = Number(jimble.getAttribute('video'));
        const audio: number = Number(jimble.getAttribute('audio'));
        const id = jimble.getAttribute('id_remote') as string;
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
    const invitation = {
      action: "INVITATION",
      tracks: {
        audio: true,
        video: true
      }
    };
    const inviteMessageB64 = btoa(JSON.stringify(invitation));
    const message = new Strophe.Builder('message', {
      to: 'focus@prosolen.net/focus',
      type: 'chat',
      xmlns: 'jabber:client'
    }).c('x', {
      xmlns: 'jabber:x:conference',
      jid: `${roomName}@conference.prosolen.net`
    }).up().c('nick', {
      xmlns: 'http://jabber.org/protocol/nick'
    }).t(displayName).up().c('jimble').t(inviteMessageB64);
    connection.send(message)
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
              const message = new Strophe.Builder('iq', {
                from: `${roomName}@prosolen.net/${userNode}`,
                id: userNode,
                to: `${roomName}@conference.prosolen.net`,
                type: 'set'
              }).c('query', {
                xmlns: 'http://jabber.org/protocol/muc#owner'
              }).c('x', {
                xmlns: 'jabber:x:data',
                type: 'submit'
              });
             connection.send(message)
              console.log('validate')

            } else if (Number(statuses[0].getAttribute('code')) === 100) {

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
  connection.addHandler(handlerMessage, null, 'message', )
  connection.addHandler(handlerIqTypeResult, null, 'iq', 'result')
  connection.addHandler(handlerPresence, null, 'presence')
  const callback = (status: number): void => {
    if (status === Strophe.Status.REGISTER) {
      // fill out the fields
      connection.register.fields.username = userNode;
      connection.register.fields.password = getRandomText(5);
      // calling submit will continue the registration process
      connection.register.submit();
      //@ts-ignore
    } else if (status === Strophe.Status.REGISTERED) {
      console.info("registered!");
      // calling login will authenticate the registered JID.
      connection.authenticate();
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
      console.info('connected', connection);
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302'
          }
        ]
      });
      peerConnection.ontrack = (event) => {
        console.log(event, 'PEERCONNECTION ON TRACK');
      };
      peerConnection.onicecandidate = (event) => {
        console.log(event, 'PEERCONECTION ONICE CANDIDATE');
      };
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track);
        });
        const message = new Strophe.Builder('presence', {
          to: `${roomName}@conference.prosolen.net/${userNode}`,
        }).c('x', {
          xmlns: 'http://jabber.org/protocol/muc'
        }).up().c('jingle', {
          action: "enter_to_room"
        });
        connection.send(message)

      });

    } else {
      // Do other stuff
    }
  };
  connection.register.connect('prosolen.net', callback);
  console.log(connection);
  return <p>Proba</p>;
}

export { Proba };
