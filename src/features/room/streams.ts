import { glagol } from '../../shared/conference/glagol';

function getLivesTransceivers() {
  return glagol.peerConnection.getTransceivers().filter((transceiver) => {
    return transceiver.currentDirection !== 'inactive';
  });

}

function getRemoteTransceivers() {
  return getLivesTransceivers().filter((transceiver) => {

    return (transceiver.receiver.track.id.indexOf('audio') >= 0 || transceiver.receiver.track.id.indexOf('video') >= 0);
  });
}
function getSharingTransceiver() {
  return getLivesTransceivers().filter((transceiver) => {
    return transceiver.receiver.track.id.indexOf('dashboard') >= 0;
  })[0];
}

export { getRemoteTransceivers, getSharingTransceiver};
