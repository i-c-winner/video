import {glagol} from "../../entities/glagol/glagol";

function RoomPage() {
  window.history.replaceState({}, '', glagol.roomName)
  console.log(glagol)
  return (
    <div className="">Room</div>
  )
}

export { RoomPage }
