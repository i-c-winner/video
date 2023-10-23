import { getRandomText } from '../plugins/getRandomText';

const roomName = getRandomText(5);
const userNode = getRandomText(5);

class Room {
  private static instance: any;
  private xmpp: any;

  constructor(xmpp: any) {
    if (!Room.instance) {
      Room.instance = this;
    }
    this.xmpp = xmpp;
    this.create = this.create.bind(this);
    console.log(this, Room.instance)
    return Room.instance;
  }

  create() {
    const message = new Strophe.Builder('presence', {
      to: `${roomName}@conference.prosolen.net/${userNode}`,
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    }).up().c('jingle', {
      action: "enter_to_room"
    });
    this.xmpp.connection.send(message);
  }
  validate() {
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
    this.xmpp.connection.send(message);
  }
  invite(){
    console.log('invite')
  }
}

export { Room };
