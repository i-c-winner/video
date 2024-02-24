import * as strophe from 'strophe.js';
import { connection } from './connection/connection';
import { webRtc } from './room/webRtc';
import { setRegister } from './plugins/rigester';
import { getRandomText } from './plugins/getRandomText';

const { Strophe } = strophe as any;
setRegister(strophe);
const callbacks = {
  roomWasValidate: () => {
    // webRtc.validate(connection.instance.send, )
  }
};
type TCallback = (...args: any[]) => void

interface IGlagol {
  init: (options: {
    conferenceUrl: string,
    WebRTCUrl: {
      [key: string]: any
    },
    userNode: string,
    roomName: string
  }) => void,
  userNode: string,
  roomName: string
  webURL: any,
  initWebRtc: () => void,
  sendMessage: (...args: any[]) => void,
  creatingConference: () => void,
  createRoom: () => void,
  validateRoom: (roomName: string, userNode: string) => void,
  invite: (roomName: string, userNode: string) => void,
  pcOnIceCandidate: (...args: any[]) => void,
  pcOnTrack: (...args: any[]) => void,
  pcOnconnectionStateChange: (...args: any[]) => void,
  pcConnectionIceCandidate: (...args: string[]) => void,
  // pushCandidate: (candidate:RTCIceCandidate)=>void,

  invitationReply: (...args: MediaStreamTrack[]) => void,
  addIceCandidate: (jimble: string) => void,
  getRoom: () => RTCPeerConnection,
  on: (name: string, callback: TCallback) => void,
  off: (name: string) => void,
  emit: (name: string, ...args: any[]) => void,
  listeners: {
    [key: string]: TCallback[]
  },
}

const Glagol: IGlagol = {
    listeners: {},
    userNode: '',
    roomName: '',
    webURL: null,
    init: function (options) {
      this.userNode = options.userNode;
      this.roomName = options.roomName;
      this.webURL = options.WebRTCUrl;
      connection.instance = new Strophe.Connection(options.conferenceUrl);


    },
    creatingConference: function () {
      connection.creating(this.userNode, this.roomName);
      connection.on('pushCandidate', (candidate: RTCIceCandidateInit) => {
        webRtc.instance.addIceCandidate(candidate[0]);
      });
      connection.on('invitation_reply', Glagol.invitationReply);
      connection.on('addIceCandidate', this.addIceCandidate);
      connection.on('roomWasCreated', this.validateRoom);
      connection.on('roomWasValidated', this.invite);
      connection.on('validateRoom', this.validateRoom);
      connection.on('invite', this.invite);
      connection.on('pcConnectionIceCandidate', this.pcConnectionIceCandidate);
      connection.on('pcOnconnectionStateChange', this.pcOnconnectionStateChange);
      connection.on('connected', this.initWebRtc);
    },
    initWebRtc: () => {
      webRtc.init(Glagol.webURL);
      webRtc.on('pcOnconnectionStateChange', Glagol.pcOnconnectionStateChange);
      Glagol.createRoom();
    },
    sendMessage: function (...args) {
      connection.instance.send(args[0]);
    },
    createRoom: function () {
      const message = new Strophe.Builder('presence', {
        to: `${this.roomName}@conference.prosolen.net/${this.userNode}`,
      }).c('x', {
        xmlns: 'http://jabber.org/protocol/muc'
      });
      connection.instance.send(message);
    },
    validateRoom: function () {
      const message = new Strophe.Builder('iq', {
        from: `${Glagol.roomName}@prosolen.net/${Glagol.userNode}`,
        id: Glagol.userNode,
        to: `${Glagol.roomName}@conference.prosolen.net`,
        type: 'set'
      }).c('query', {
        xmlns: 'http://jabber.org/protocol/muc#owner'
      }).c('x', {
        xmlns: 'jabber:x:data',
        type: 'submit'
      });
      connection.instance.send(message);
    },
    invite: function () {
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
        jid: `${Glagol.roomName}@conference.prosolen.net`
      }).up().c('nick', {
        xmlns: 'http://jabber.org/protocol/nick'
      }).t('dispalayName').up().c('jimble').t(inviteMessageB64);
      connection.instance.send(message);
      Glagol.emit('roomOn');
    },
    pcOnconnectionStateChange: function (args) {
      if (args[0].target.connectionState === 'connected') {
        console.info('Соединение с видеомостом установленно');
        // this.emit('changeConnecting', true);
      } else {
        console.error(new Error('Соединение с видеомостом отсутствует'));
        // this.emit('changeConnecting', false);
      }
    },
    pcOnIceCandidate: function (args) {
      if (args[0].event.candidate) {
        const candidate = btoa(JSON.stringify({ candidate: args[0].event.candidate }));
        const message = new Strophe.Builder('message', {
          to: `${this.roomName}@conference.prosolen.net/focus`,
          type: 'chat'
        }).c('body').t(candidate);
        connection.instance(message);
      }
    },
    pcOnTrack: function () {
    },
    pcConnectionIceCandidate(...args) {

    },
    invitationReply(args) {
      const sender = webRtc.instance.addTrack(args[0]);
    },
    getRoom: () => webRtc.instance,
    addIceCandidate: function (jimble) {
      webRtc.instance.setRemoteDescription(JSON.parse(atob(jimble))).then(() => {
        return webRtc.instance.createAnswer({
          iceRestart: true
        });
      }).then((answer) => {
        const answer64 = btoa(JSON.stringify({ answer }));
        webRtc.instance.setLocalDescription(answer).then(() => {
          const message: Strophe.Builder = new Strophe.Builder('message', {
            to: `${Glagol.roomName}@conference.prosolen.net/focus`,
            type: 'chat'
          }).c('body').t(answer64);
          connection.instance.send(message);
        }).catch((error) => {
          console.error(new Error('error'), error);
        });
      });
    },
    on: function (name: string, callback: (...args: any[]) => void) {
      if (!this.listeners[name]) {
        this.listeners[name] = [];
      }
      this.listeners[name].push(callback);
    }
    ,
    off: function (name) {
      if (this.listeners[name]) {
        this.listeners[name] = [];
      } else {
        console.error((error: any) => new Error(error), `Слушатель ${name} не существует`);
      }
    }
    ,
    emit: function (name, ...args) {
      if (!this.listeners[name]) {
        console.error((error: any) => new Error(error), `Слушатель ${name} не существует`);
      }
      this.listeners[name].forEach((listener) => {
        listener(args);
      });
    }
  }
;

export { Glagol };

