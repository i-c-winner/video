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
      startLocalStream({
        video: true,
        audio: true
      }).then((stream: any) => {
        stream.getTracks().forEach((track: any) => {
          conference.addTrack(track, stream)
        })
      })
    }
  }, [ isPending ])
  if (isPending) return <>...isPending</>
  if (data) {

    if (firstLoad) {
      conference.XmppOn("createRoom", createRoom)
      conference.XmppOn("validateRoom", validateRoom)
      conference.XmppOn("inviteRoom", inviteRoom)

      function createRoom() {
        const message = new Strophe.Builder('presence', {
          to: `${glagol.roomName}@conference.prosolen.net/${glagol.userNode}`,
        }).c('x', {
          xmlns: 'http://jabber.org/protocol/muc'
        }).up().c('jingle', {
          action: "enter_to_room"
        })
        conference.send(message)
      }

      function validateRoom() {
        const message = new Strophe.Builder('iq', {
          from: `${glagol.roomName}@prosolen.net/${glagol.userNode}`,
          id: glagol.userNode,
          to: `${glagol.roomName}@conference.prosolen.net`,
          type: 'set'
        }).c('query', {
          xmlns: 'http://jabber.org/protocol/muc#owner'
        }).c('x', {
          xmlns: 'jabber:x:data',
          type: 'submit'
        })
        conference.send(message)
      }

      function inviteRoom() {
        const invitation = {
          action: "INVITATION",
          localTracks: {
            audio: true,
            video: true
          }
        }
        const inviteMessageB64 = btoa(JSON.stringify(invitation))
        const message = new Strophe.Builder('message', {
          to: 'focus@prosolen.net/focus',
          type: 'chat',
          xmlns: 'jabber:client'
        }).c('x', {
          xmlns: 'jabber:x:conference',
          jid: `${glagol.roomName}@conference.prosolen.net`
        }).up().c('nick', {
          xmlns: 'http://jabber.org/protocol/nick'
        }).t(glagol.userDisplayName).up().c('jimble').t(inviteMessageB64)
        conference.send(message)
      }
      conference.xmppRegistering()
      firstLoad = false
    }

    return <div className="">Room</div>
  }
}

export { RoomPage }
