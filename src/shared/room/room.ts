import { TCallbackConference } from '../../app/types';
import { IGlagol, TSendMessage } from '../index';

class Room {
  private static instance: any;
  private xmpp: any;
  // @ts-ignore
  private roomName: string;
  // @ts-ignore
  private displayName: string;
  // @ts-ignore
  private userNode: string;
  // @ts-ignore
  private listeners: {
    [key: string]: TCallbackConference[]
  };

  constructor() {
    if (Room.instance) {
      return Room.instance
    }
    Room.instance=this
    this.listeners = {};
    this.roomName = '';

    this.userNode = '';
    this.displayName = '';
    return Room.instance;
  }


  create(action: TSendMessage, roomName: string, userNode: string) {
    const message = new Strophe.Builder('presence', {
      to: `${roomName}@conference.prosolen.net/${userNode}`,
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    })
    action(message);
  }

  validate(action: TSendMessage, roomName: string, userNode: string) {
    const message = new Strophe.Builder('iq', {
      from: `${roomName}@prosolen.net/${userNode}`,
      id: this.userNode,
      to: `${roomName}@conference.prosolen.net`,
      type: 'set'
    }).c('query', {
      xmlns: 'http://jabber.org/protocol/muc#owner'
    }).c('x', {
      xmlns: 'jabber:x:data',
      type: 'submit'
    });
    action(message);
  }

  invite(action: TSendMessage, roomName: string, displayName: string) {
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
    action(message);
  }
}

export { Room };
