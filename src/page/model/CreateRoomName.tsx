import React from 'react';
import {useAsync} from 'react-async';
import {glagol} from '../../shared/conference/glagol';
const connection= async ()=>{
  return glagol.createConference()
}
const  CreateRoomName= React.forwardRef<any>((props, ref) => {
  const {data, error, isPending}= useAsync({promiseFn: connection})
  if (isPending) {
    return <p>...Pending</p>
  }
  if (data) {
    return <div>
      <input ref={ref} />
    </div>
  }
  if (error) {
    return <p>error</p>
  }
  return <p>start</p>
})
export {CreateRoomName}
