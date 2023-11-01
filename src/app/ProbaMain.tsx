import { Proba } from './Proba';
import { useRef, useState } from 'react';
import { getRandomText } from '../features/plugins/getRandomText';
console.log(Proba)
debugger

function ProbaMain() {
  const [state, setState]= useState(false)
  const refUnput= useRef<any>()
  const [roomName, setRoomName]= useState(getRandomText(5))
function click() {
  setState(true)
}
function change(event: any){
    setRoomName(event.target.value)
}
  return (
    <div>
      { state &&  <Proba roomName={roomName} />}

      <input ref={refUnput} value={roomName} onChange={change}/>
      <button onClick={click}>Click</button>
    </div>

  );
}

export { ProbaMain };
