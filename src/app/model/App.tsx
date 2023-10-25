import { useEffect, useRef, useState } from 'react';
import { getRandomText } from '../../features/plugins/getRandomText';
import { conference } from '../../features/conference/conference';
import {xmpp} from '../../features/conference/xmpp';
import {Room} from '../../features/room/room';

const room=new Room()

function App() {
  const [ params, setParams ] = useState({
    roomName: getRandomText(5),
    userNode: getRandomText(5),
    displayName: getRandomText(5)
  });
  const refLogin = useRef<HTMLInputElement>(null);
  const refRoom = useRef<HTMLInputElement>(null);

  function changeLogin(event: any) {
    if (refLogin.current !== null) {
      setParams(() => {
        return {
          ...params,
          displayName: event.target.value
        };
      });
    }
  }
  useEffect(()=>{
    conference.on('localStreamDepended', localStreamDepended)
    function localStreamDepended() {
      xmpp.init(params.roomName, params.displayName)
    }
    xmpp.on('xmppConnected', xmppConnected)
    function xmppConnected() {
      room.create(params.roomName, params.displayName, params.userNode)
      console.log('CONNECTED')
    }
    room.on('roomCreated', roomCreated)
    function roomCreated(...args: any[]){
      xmpp.sendMessage(args[0])
    }
  },[])

  function changeRoom(event: any) {
    if (refRoom !== null) {
      setParams(() => {
        return {
          ...params,
          roomName: event.target.value
        };
      });
    }
  }

  function logininFunc() {
    conference.inizialization(params);
  }
  useEffect(()=>{

  },[])
  return (
    <div>
      <>displayName</>
      <input ref={refLogin} onChange={changeLogin}/>
      <p>room</p>
      <input ref={refRoom} onChange={changeRoom}/>
      <button onClick={logininFunc}>click</button>
    </div>
  );
}

export { App};
