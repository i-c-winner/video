import { ISharing } from './types';
import { glagol } from '../shared/conference/glagol';

const sharing: ISharing= {
  start: function () {
    navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1200,
        height: 800
      },
      audio: false
    }).then((stream) => {
      stream.getTracks().forEach((track) => {
        if (track.kind === 'video') {
          track.contentHint='detail'
          glagol.peerConnection.addTrack(track);
        }
      });
      return glagol.peerConnection.createOffer({ iceRestart: false });
    }).then((offer) => {
      return glagol.peerConnection.setLocalDescription(offer);
    }).then(() => {
      const offer64 = btoa(JSON.stringify({ offer: glagol.peerConnection.localDescription }));
      const message = $msg({ to: `${glagol.params.roomName}@conference.prosolen.net/focus`, type: 'chat' })
        .c('x', { xmlns: 'http://jabber.org/protocol/muc#user' }).up()
        .c('body').t('send_dashboard').up()
        .c('jimble', { xmlns: 'urn:xmpp:jimble', ready: 'true' }).t(offer64);
      glagol.sendMessage(message);
    }).catch((error: any) => console.log(`This is Error by sharing ${error}`));
}
}
export {sharing}
