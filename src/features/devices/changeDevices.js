const changeDevices = {
    audio: function () {
        // app.glagolVC.glagolManager.changeAudioOutput(deviceId)
    },
    mic: function (deviceId) {
        console.log(deviceId);
        // app.glagolVC.glagolManager?.changeDevices(deviceId, 'audio')
    },
    camera: function (deviceId) {
        console.log(deviceId);
        // app.glagolVC.glagolManager.changeDevices(deviceId, 'video')
    },
};
export { changeDevices };
