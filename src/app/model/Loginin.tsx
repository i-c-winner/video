import { ChangeEvent, useRef, useState } from 'react';
import { getRandomText } from '../../features/plugins/getRandomText';
import { App } from './App';
import { glagol } from '../constants/glagol';

function Loginin() {
  console.log('logonin')
  const refDisplayName= useRef<HTMLInputElement>()
  const refRoomName= useRef<HTMLInputElement>()
  const [ displayName, setDisplayName] = useState<string>(getRandomText(5));
  const [ roomName, setRoomName ] = useState<string>(getRandomText(5));
  const [ visible, setVisible ] = useState<boolean>(false);

  function changeDisplayName(event: any) {
   glagol.displayName=event.target.value
  }

  function changeRoom(event: any) {
   glagol.roomName= event.target.value
  }

  function logininFunc() {
    setVisible(true);
  }


  return !visible ? <div>
      <>display     Name dsdfsd</>
      <input  onChange={changeDisplayName}/>
      <p>room</p>
      <input onChange={changeRoom}/>
      <button onClick={logininFunc}>click</button>
    </div>
    : <App />;
}

export { Loginin };
