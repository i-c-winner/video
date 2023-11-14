import { ISharing } from './types';
import { glagol } from '../shared/conference/glagol';

const sharing: ISharing = {

  start: function () {
    let screenStream=new MediaStream
    return navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1200,
        height: 800
      },
      audio: false
    }).then((stream) => {
      screenStream=stream
      stream.getTracks().forEach((track) => {
        if (track.kind === 'video') {
          track.applyConstraints({ deviceId: 'mySharingScreen' });
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
      return screenStream
    }).catch((error: any) => console.log(`This is Error by sharing ${error}`));
  },
  stop: function () {
    glagol.peerConnection.getTransceivers().forEach((transceiver) => {
      if (transceiver.sender.track?.contentHint === 'detail') {
        transceiver.sender.track.stop()
        glagol.peerConnection.removeTrack(transceiver.sender);
      }
    });
    // glagol.peerConnection.createOffer({iceRestart: false}).then(()=>{
    //   const offer64= btoa(JSON.stringify({}))
    // })
    // <message from='firstroom@conference.prosolen.net/user2345'     //фром - не обязательно
    // xml:lang='en'
    // type='chat'
    // xmlns='jabber:client'                                   // это тоже не обязательно - строфе сам добавит
    // to='firstroom@conference.prosolen.net/focus'>
    // <x xmlns='http://jabber.org/protocol/muc#user'/>
    //   <body>
    //     remove_dashboard
    //   </body>
    //   <jimble xmlns='urn:xmpp:jimble' ready='false' >   // здесь было бы логично audio= '0' video= '1', но бридж это не анализирует.
    //   jimble_answer_B64
    //   </jimble>
    //   </message>


    glagol.peerConnection.createOffer({ iceRestart: false }).then((offer) => {
      return glagol.peerConnection.setLocalDescription(offer);
    }).then(() => {
      const offer64 = btoa(JSON.stringify({ offer: glagol.peerConnection.localDescription }));
      const message = $msg({
        to: glagol.params.roomName + '@' + 'conference.prosolen.net' + '/' + "focus",
        type: 'chat'
      })
        .c('x', { xmlns: 'http://jabber.org/protocol/muc#user' }).up()
        .c('body', {}, 'remove_dashboard')
        .c('jimble', { xmlns: 'urn:xmpp:jimble', ready: 'true' }).t(offer64);
      glagol.sendMessage(message);
    });

  }
};
export { sharing };
