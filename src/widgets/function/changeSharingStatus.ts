import { glagol } from '../../shared/conference/glagol';

const changeSharingStatus= {
  iWasSharing: function ()  {
    return Boolean(glagol.peerConnection.getTransceivers().find((transceiver) => {
     return transceiver.sender.track?.contentHint === 'detail';
    }));
  },
  someBodySharing: function () {
    return Boolean(glagol.peerConnection.getTransceivers().find((transceiver) => {
      console.log(transceiver.receiver.track?.label, transceiver.receiver.track?.label?.indexOf('dashboard'))
     return transceiver.receiver.track?.label?.indexOf('dashboard')>=0&&transceiver.currentDirection!=='inactive';
    }));
  },
  nobodySharing: function () {
    return !(this.iWasSharing() || this.someBodySharing());
  }
};
export {changeSharingStatus}

