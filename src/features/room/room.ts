import { TCallbackConference } from '../../app/types';

class Room {
  private static instance: any;
  private xmpp: any;
  private roomName: string;
  private displayName: string;
  private userNode: string;
  private listeners: {
    [key: string]: TCallbackConference[]
  };

  constructor() {
    if (!Room.instance) {
      Room.instance = this;
    }
    this.listeners={}
    this.roomName=''
    this.userNode=''
    this.displayName=''
    this.create = this.create.bind(this);
    return Room.instance;
  }

  create(roomName: string, userNode: string) {

    const message = new Strophe.Builder('presence', {
      to: `${roomName}@conference.prosolen.net/${userNode}`,
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    }).up().c('jingle', {
      action: "enter_to_room"
    });
    console.log(message)
    this.emit('sendMessage', message)
  }
  validate(roomName: string, userNode: string) {
    const message = new Strophe.Builder('iq', {
      from: `${roomName}@prosolen.net/${this.userNode}`,
      id: this.userNode,
      to: `${roomName}@conference.prosolen.net`,
      type: 'set'
    }).c('query', {
      xmlns: 'http://jabber.org/protocol/muc#owner'
    }).c('x', {
      xmlns: 'jabber:x:data',
      type: 'submit'
    });
    this.emit('sendMessage', message)
  }
  invite(roomName: string, displayName: string){
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
      jid: `${this.roomName}@conference.prosolen.net`
    }).up().c('nick', {
      xmlns: 'http://jabber.org/protocol/nick'
    }).t(displayName).up().c('jimble').t(inviteMessageB64);
    this.emit('sendMessage', message)
  }
  getParticipiant() {
    // <iq from='crone1@shakespeare.lit/desktop'
    // id='member3'
    // to='coven@chat.shakespeare.lit'
    // type='get'>
    // <query xmlns='http://jabber.org/protocol/muc#admin'>
    // <item affiliation='member'/>
    //   </query>
    //   </iq
    const message= new Strophe.Builder('iq', {
      from: `${this.roomName}@prosolonet.net/${this.userNode}`,
      to: 'focus@conference.prosolen.net',
      type: 'get'
    }).c('query', {
      xmlns: 'http://jabber.org/protocol/muc#admin'
    }).c('item', {
      affiliation: 'member'
    })
    this.emit('sendMessage', message)
  }
  on(name: string, callback: TCallbackConference) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }

  emit(name: string, ...args: any[]) {
    if (!this.listeners[name]) {
      console.error(new Error(`Слушатель ${name} не существует`));
    }else {
      this.listeners[name].forEach((listener)=>{
        listener(args[0])
      })
    }
  }
}

export { Room };
