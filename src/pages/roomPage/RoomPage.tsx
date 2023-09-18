import { glagol } from "../../entities/glagol/glagol";
import { Conference } from "../../functions/Conference";
import { useAsync } from "react-async";
import { startLocalStream } from "../../functions/startLocalStream";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStream, removeStream } from "../../app/store/streamsSlice";
import { Box } from "@mui/material";
import { BigScreen } from "../../widgets/bigScreen/BigScreen";
import { pushChat } from '../../app/store/chatSlice';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '../../app/types';

let firstLoad = true;
const conference = new Conference();

const connection = async () => {
  const data = conference.initPeerConnection();
  return data;
};

function RoomPage() {
  const { audioStream, videoQuantity, leftOut } = useSelector((state: IRootState) => state.config.conference);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  window.history.replaceState({}, '', glagol.roomName);
  const { data, error, isPending } = useAsync(connection);
  useEffect(() => {
    if (!isPending) {
      startLocalStream({
        video: true,
        audio: true
      }).then((stream: any) => {
        glagol.localStreamForPeer = stream;
        conference.changeAudio(audioStream);
        conference.changeQualityVideo(videoQuantity);
        stream.getTracks().forEach((track: any) => {
          conference.addTrack(track);
          conference.changeQualityVideo(videoQuantity);
        });
      });
    }
  }, [ isPending ]);
  useEffect(() => {
    conference.changeQualityVideo(videoQuantity);
  }, [ videoQuantity ]);
  useEffect(() => {
    conference.changeAudio(audioStream);
  }, [ audioStream ]);
  useEffect(() => {
   if (leftOut) conference.leaveRoom();
  }, [ leftOut ]);
  if (isPending) return <>...isPending</>;
  if (data) {
    if (firstLoad) {
      conference.XmppOn("createRoom", createRoom);
      conference.XmppOn("validateRoom", validateRoom);
      conference.XmppOn("inviteRoom", inviteRoom);
      conference.peerConnectionOn('setStreamId', setStreamId);
      conference.XmppOn('deleteStreamId', deleteStreamId);
      conference.XmppOn('messageWasReceived', messageWasReceived);
      conference.peerConnectionOn('leaveRoom', leaveRoom);

      function leaveRoom() {
        navigate('/exit');
      }

      function createRoom() {
        const message = new Strophe.Builder('presence', {
          to: `${glagol.roomName}@conference.prosolen.net/${glagol.userNode}`,
        }).c('x', {
          xmlns: 'http://jabber.org/protocol/muc'
        }).up().c('jingle', {
          action: "enter_to_room"
        });
        conference.send(message);
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
        });
        conference.send(message);
      }

      function inviteRoom() {
        const invitation = {
          action: "INVITATION",
          localTracks: {
            audio: true,
            video: true
          }
        };
        const inviteMessageB64 = btoa(JSON.stringify(invitation));
        const message = new Strophe.Builder('message', {
          to: 'focus@prosolen.net/focus',
          type: 'chat',
          xmlns: 'jabber:client'
        }).c('x', {
          xmlns: 'jabber:x:conference',
          jid: `${glagol.roomName}@conference.prosolen.net`
        }).up().c('nick', {
          xmlns: 'http://jabber.org/protocol/nick'
        }).t(glagol.userDisplayName).up().c('jimble').t(inviteMessageB64);
        conference.send(message);
      }

      function setStreamId(stream: RTCTrackEvent[]) {
        const id = stream[0].streams[0].id;
        if (id.split('/')[1] !== undefined) dispatch(addStream(id.split('/')[1]));
      }

      function deleteStreamId(stream: string) {
        delete glagol.currentStreams[stream[0]];
        dispatch(removeStream(stream[0]));
      }

      function messageWasReceived(stanza: any) {
        try {
          const jingle = stanza[0].getElementsByTagName('jingle')[0];
          const text = Strophe.getText(stanza[0].getElementsByTagName('body')[0]);
          const date = jingle.getAttribute('date');
          const id = jingle.getAttribute('id');
          const author = jingle.getAttribute('authorName');
          dispatch(pushChat({
              author,
              time: date,
              text,
              id
            })
          );
        } catch (e) {
        }
      }

      conference.xmppRegistering();
      firstLoad = false;
    }

    return <Box sx={{
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'flex',
      position: 'absolute',
      justifyContent: 'space-between'
    }}>
      <BigScreen/>
    </Box>;
  }
}

export { RoomPage };
