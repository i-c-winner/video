import { useEffect, useRef, useState } from 'react';
import { getRandomText } from '../../features/plugins/getRandomText';
import { conference } from '../../features/conference/conference';
import { xmpp } from '../../features/conference/xmpp';
import { Room } from '../../features/room/room';

const room = new Room();

function App() {
  const params = {
    displayName: getRandomText(5),
    roomName: getRandomText(5),
    userNode: getRandomText(5)
  };

  function changeLogin(event: any) {
    params.displayName = event.target.value;
  }

  function changeRoom(event: any) {
    params.roomName = event.target.value;
  }

  useEffect(() => {
    conference.on('localStreamDepended', localStreamDepended);

    function localStreamDepended() {
      xmpp.init(params.roomName, params.displayName);
    }

    xmpp.on('xmppConnected', xmppConnected);

    function xmppConnected() {
      room.create(params.roomName, params.displayName, params.userNode);
      console.log('CONNECTED');
    }

    room.on('sendMessage', (message: any) => {
      xmpp.sendMessage(message);
    });
    xmpp.on('doValidateRoom', (() => {
      room.validate();
    }))
    xmpp.on('doInviteRoom', (()=>{
      room.invite()
    }));
  }, []);


  function logininFunc() {
    conference.initialization(params);
  }

  useEffect(() => {

  }, []);
  return (
    <div>
      <>displayName</>
      <input onChange={changeLogin}/>
      <p>room</p>
      <input onChange={changeRoom}/>
      <button onClick={logininFunc}>click</button>
    </div>
  );
}

export { App };
