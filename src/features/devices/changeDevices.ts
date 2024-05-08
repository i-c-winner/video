const changeDevices = {
  audio: function () {
    // app.glagolVC.glagolManager.changeAudioOutput(deviceId)
  },
  mic: function (deviceId: string) {
    console.log(deviceId);
    // app.glagolVC.glagolManager?.changeDevices(deviceId, 'audio')
  },
  camera: function (deviceId: string) {
    console.log(deviceId);
    // app.glagolVC.glagolManager.changeDevices(deviceId, 'video')
  },
};

export { changeDevices };
