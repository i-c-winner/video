import { glagol } from '../../shared/conference/glagol';

function getLivesTransceivers() {
  return glagol.peerConnection.getTransceivers().filter((transceiver) => {
    return transceiver.currentDirection !== 'inactive';
  });

}

function getRemoteStreams() {
  return getLivesTransceivers().filter((transceiver) => {
    return (transceiver.receiver.track.label.indexOf('audio') >= 0 || transceiver.receiver.track.label.indexOf('video') >= 0);
  });
}

export { getRemoteStreams };
