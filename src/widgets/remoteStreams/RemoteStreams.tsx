import { useEffect } from "react";
import {glagol} from "../../entities/glagol/glagol";

function RemoteStreams(props: {streamId: string}) {
  useEffect(()=>{
console.log(glagol.currentStreams[props.streamId])
  })
  return (

    <div className="">{props.streamId}</div>
  )
}

export { RemoteStreams }
