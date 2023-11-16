import { glagol } from '../../entity/conference/glagol';

const changeSharingStatus= {
  iWasSharing: function ()  {
    return glagol.peerConnection.getTransceivers().find((transceiver) => {
     return transceiver.sender.track?.contentHint === 'detail';
    });
  },
  someBodySharing: function () {
    return glagol.peerConnection.getTransceivers().find((transceiver) => {
     return transceiver.receiver.track?.id?.indexOf('dashboard')>=0&&transceiver.currentDirection!=='inactive';
    });
  },
  nobodySharing: function () {
    return !(Boolean(this.iWasSharing())|| Boolean(this.someBodySharing()));
  }
};
export {changeSharingStatus}

