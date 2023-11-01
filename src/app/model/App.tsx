import { useRef, useState } from 'react';
import { glagol } from '../../shared/conference/glagol';
import { CreateRoomName } from '../../page/model/CreateRoomName';
import { CreateDisplayName } from '../../page/model/CreateDisplayName';
import { RoomPage } from '../../page/model/RoomPage';

function App() {
  const [ state, setState ] = useState<any>('createRoomName');
  const refDisplayName = useRef<string>('');

  function getChildren() {
    switch (state) {
      case 'createUserName' :
        return <CreateDisplayName/>;
      case 'createRoomName':
        return <CreateRoomName/>;
      case 'roomPage':
        return <RoomPage />;
      default:
        return <p>unknown children</p>;
    }
  }

  function changeState() {
    if (state === 'createRoomName') {
      setState('createUserName');
    } else if (state === 'createUserName') {
      setState('roomPage');
    }
  }

  return <div>
    {state}
    {getChildren()}
    {state !== 'roomPage' && <button onClick={changeState}>click</button>}
  </div>;
}

export { App };
