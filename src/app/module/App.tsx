import { xmpp } from '../../features/conference/xmpp';
import { Room } from '../../features/room/room';

console.log('APp');
const room = new Room(xmpp);
xmpp.init(room);


function App() {
  console.log('APp 01');

  return <p>APP</p>;
}

export { App };
