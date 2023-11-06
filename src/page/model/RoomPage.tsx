import {glagol} from '../../shared/conference/glagol';
import { useEffect } from 'react';
import {sharing} from '../../entity/sharing';

function RoomPage() {
  useEffect(()=>{
    glagol.roomInstance.create()
  },[])
  function sharingStart() {
    sharing.start()
  }
  return <div>
    <p>RoomPage</p>
    <button onClick={sharingStart}>sharing</button>
  </div>
}

export {RoomPage}
