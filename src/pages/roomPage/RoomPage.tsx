import {glagol} from "../../entities/glagol/glagol";
import {Conference} from "../../functions/Conference";
import {useAsync} from "react-async";
import { useEffect } from "react";
let firstLoad= true

const conference= new Conference()



const connection = async()=>{
  const data=conference.initPeerConnection()
  return data
}
function RoomPage() {
  window.history.replaceState({}, '', glagol.roomName)
  const {data, error, isPending} = useAsync(connection)
  if (isPending) return <>...isPending</>
  if (data) {
    console.log(firstLoad, "DATA")
   if (firstLoad) conference.xmppRegistering()
    firstLoad=false
    return <div className="">Room</div>
  }
}

export { RoomPage }
