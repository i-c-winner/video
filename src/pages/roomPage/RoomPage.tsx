import { glagol } from "../../entities/glagol/glagol";
import { Conference } from "../../functions/Conference";
import { useAsync } from "react-async";
import { startLocalStream } from "../../functions/startLocalStream";
import { useEffect } from "react";

let firstLoad = true

const conference = new Conference()

const connection = async () => {
  const data = conference.initPeerConnection()
  return data
}

function RoomPage() {

  window.history.replaceState({}, '', glagol.roomName)

  const { data, error, isPending } = useAsync(connection)
  useEffect(() => {
    if (!isPending) {
      startLocalStream().then((stream: any) => {
        stream.getTracks().forEach((track: any) => {
          conference.addTrack(track, stream)
        })
      })
    }
  }, [ isPending ])
  if (isPending) return <>...isPending</>
  if (data) {

    if (firstLoad) {
      conference.XmmpOn("inviteToRoom", createRoom)
      function createRoom() {
        const message = new Strophe.Builder('presence', {
          to: `${glagol.roomName}@conference.prosolen.net/${glagol.userNode}`,
        }).c('x', {
          xmlns: 'http://jabber.org/protocol/muc'
        })
        conference.send(message)
      }

      conference.xmppRegistering()
    }
    firstLoad = false
    return <div className="">Room</div>
  }
}

export { RoomPage }
