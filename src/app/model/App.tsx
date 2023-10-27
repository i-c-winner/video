import { useEffect, useRef, useState } from 'react';
import { getRandomText } from '../../features/plugins/getRandomText';
import { conference } from '../../features/conference/conference';
import { xmpp } from '../../features/conference/xmpp';
import { Room } from '../../features/room/room';
import { useAsync } from 'react-async';
import { glagol } from '../constants/glagol';
import { peerConnection } from '../../features/conference/peerConnection';
let loaded: boolean= false
const room = new Room();
const params = {
  displayName: glagol.displayName,
  roomName: glagol.roomName,
  userNode: getRandomText(5)
};
const connection = (async () => {
    params.displayName= glagol.displayName
    params.roomName=glagol.roomName
  return xmpp.init(params.roomName, params.displayName);
});

const App = () => {
  if (!loaded) {
    // xmpp.on('xmppInit', () => {
    //   peerConnection.setLocalStream();
    // });

    peerConnection.on('localStreamDepended', (() => {
      room.create(params.roomName, params.displayName, params.userNode);
    }));

    room.on('sendMessage', (message: any) => {
      xmpp.sendMessage(message);
    });
    xmpp.on('doValidateRoom', (() => {
      room.validate();
    }));
    xmpp.on('doInviteRoom', (() => {
      room.invite();
    }));

    loaded=true
  }
  function getParticipaiant() {
    room.getParticipiant()
  }
  const { data, error, isPending }: any = useAsync({
    promiseFn: connection
  });
  if (isPending) {

    return <p>...is Pending</p>;
  }
  if (data) {
   console.log(data, 'DATA')
    data.addHandlers()
    peerConnection.setLocalStream();
    return <p>{glagol.roomName}
    <button onClick={getParticipaiant}>getParticipiant</button>
    </p>;
  }

  function changeLogin(event: any) {
    params.displayName = event.target.value;
  }

  function changeRoom(event: any) {
    params.roomName = event.target.value;
  }

  function logininFunc() {
    conference.initialization(params);
  }

  return <p>dddd</p>;
};

export { App };
