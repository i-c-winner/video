import React from 'react';
import {useAsync} from 'react-async';
import {glagol} from '../../shared/conference/glagol';

const connection= async ()=>{
  return glagol.setLocalStream()
}
const  CreateDisplayName= React.forwardRef<HTMLInputElement>((props, ref) => {
  const {data, error, isPending}= useAsync({promiseFn: connection})
  if (isPending) {
    return <p>...Pending</p>
  }
  if (data) {
    console.log(data, 'COnnectioN')
data.getTracks().forEach((track)=>{
  glagol.peerConnection.addTrack(track)
})
    glagol.peerConnectionAddHandlers()
    return <div>
      <input ref={ref} />
    </div>
  }
  if (error) {
    return <p>error</p>
  }
  return <p>start</p>
})
export {CreateDisplayName}
