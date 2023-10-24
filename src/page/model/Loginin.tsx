import { useRef } from 'react';
import {useDispatch} from 'react-redux';
import {changeUser} from '../../app/store/configSlice';

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
return (
  <div>
    <input ref={refLogin} onChange={changeLogin}/>
    <input ref={refRoom} onChange={changeRoom}/>
  </div>
)
}
export {Loginin}
