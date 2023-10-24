import { useRef } from 'react';
import {useDispatch} from 'react-redux';
import {changeUser} from '../../app/store/configSlice';
import { xmpp } from '../../features/conference/xmpp';
import { Room } from '../../features/room/room';

const room = new Room(xmpp);

function Loginin () {
  const refLogin=useRef<HTMLInputElement>(null)
  const refRoom=useRef<HTMLInputElement>(null)
  const dispatch=useDispatch()
  function changeLogin(event: any) {
    if (refLogin.current!==null) {
      dispatch(changeUser({key: 'displayName', value: event.target.value}))
    }
  }
  function changeRoom(event: any) {
if (refRoom!==null) {
  dispatch(changeUser({key: 'roomName', value: event.target.value}))
}
  }

  function logininFunc() {
    if (refRoom.current!==null&&refLogin.current!==null) xmpp.init(room, refRoom.current.value, refLogin.current.value);
  }

  return (
  <div>
    <>displayName</>
    <input ref={refLogin} onChange={changeLogin}/>
    <p>room</p>
    <input ref={refRoom} onChange={changeRoom}/>
    <button onClick={logininFunc}>click</button>
  </div>
)
}
export {Loginin}
