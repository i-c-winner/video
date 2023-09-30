import { glagol } from "../../entities/glagol/glagol";
import { conference } from "../../functions/Conference";
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
import {
  changeItHasSharingStream,
  changeRemoteBoxIsVisible,
  changeSharingScreenIsOpen
} from '../../app/store/configSlice';
import { PeerConnection } from '../../entities/conference/peerConnection';

let firstLoad = true;
// const conference = new Conference();

const connection = async () => {
  const data = conference.initPeerConnection();
  return data;
};

function RoomPage() {
  const { remoteBoxIsVisible, sharingScreenIsOpen } = useSelector((state: IRootState) => state.config.UI);
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
      }).then((stream) => {
        glagol.localStreamForPeer = stream;
        conference.changeAudio(audioStream);
        conference.changeQualityVideo(videoQuantity);
        stream.getTracks().forEach((track: MediaStreamTrack) => {
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
  useEffect(() => {
    // if (sharingScreenIsOpen) {
    //   const message = new Strophe.Builder('message', {
    //     to: `${glagol.roomName}@conference.prosolen.net/focus`,
    //     type: 'chat',
    //     'xml:lang': 'en'
    //   }).c('x', { xmlns: 'http://jabber.org/protocol/muc#user', ready: "true" }).up()
    //     .c('body', {}).t("offer_dashboard").up()
    //     .c('jimble', { xmlns: 'urn:xmpp:jimble', ready: 'true' });
    //   conference.send(message);
    // } else {
    //   glagol.sharingStream = null;
    //   dispatch(changeItHasSharingStream(false));
    // }
  }, [ sharingScreenIsOpen ]);
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
      conference.XmppOn('addDashboard', addDashboard);
      conference.XmppOn('sendDashboard', sendDashboard);
      conference.XmppOn('startSharing', startSharing);


      function leaveRoom() {
        navigate('/exit');
      }

      function startSharing() {
        navigator.mediaDevices.getDisplayMedia({
          video: {
            width: 1200,
            height: 800
          },
          audio: false
        }).then((stream) => {
          glagol.sharingStream = stream;
          stream.getTracks().forEach((track) => {
            if (track.kind === 'video') {
              conference.addTrack(track);
            }
          });
          return conference.getPeerConnection().createOffer();
        }).then((offer) => {
          return conference.getPeerConnection().setLocalDescription(offer);
        }).then((offer) => {
          const offer64 = btoa(JSON.stringify({ offer: conference.getPeerConnection().localDescription }));
          const message = $msg({ to: `${glagol.roomName}@conference.prosolen.net/focus`, type: 'chat' })
            .c('x', { xmlns: 'http://jabber.org/protocol/muc#user' }).up()
            .c('body').t('send_dashboard').up()
            .c('jimble', { xmlns: 'urn:xmpp:jimble', ready: 'true' }).t(offer64);
          conference.send(message);
        });
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
          tracks: {
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

      function setStreamId(id: string) {
        if (!remoteBoxIsVisible) openRemoteStream(true);
        dispatch(addStream(id[0]));
      }

      function deleteStreamId(id: string) {
        glagol.currentStreams = glagol.currentStreams.filter(currentId => !currentId.id.includes(id[0]));
        dispatch(removeStream(id[0]));
        if (glagol.currentStreams.length === 0) {
          openRemoteStream(false);
        }
      }

      function messageWasReceived(stanza: Element[]) {
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

      function openRemoteStream(visible: boolean) {
        dispatch(changeRemoteBoxIsVisible(visible));
      }

      function addDashboard(params: any[]) {
        const peerConnection = new RTCPeerConnection();
        peerConnection.ontrack = ((event) => {
          if (event.track.id.includes('dashboard')) {
            glagol.sharingStream = event.streams[0];
          }
        });
        peerConnection.setRemoteDescription(JSON.parse(atob(params[0]))).then(() => {
          dispatch(changeSharingScreenIsOpen(true));
        });
      }

      function sendDashboard(params: any[]) {
        console.log(params[0]);
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
