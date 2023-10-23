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
    return Room.instance;
  }

  create() {
    console.log(this)
    const message = new Strophe.Builder('presence', {
      to: `${roomName}@conference.prosolen.net/${userNode}`,
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    }).up().c('jingle', {
      action: "enter_to_room"
    });
    this.xmpp.connection.send(message);
  }
}

export { Room };
