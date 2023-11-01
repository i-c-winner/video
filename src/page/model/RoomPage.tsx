import {glagol} from '../../shared/conference/glagol';
import { useEffect } from 'react';

function RoomPage() {

  console.log(glagol)
  useEffect(()=>{
    glagol.roomInstance.create()
  },[])
  return <p>RoomPage</p>
}

export {RoomPage}
