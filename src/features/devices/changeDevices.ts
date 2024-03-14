import { app } from "../../app/model/constants/app";

const changeDevices = {
  audio: function (label: string) {
    const deviceId = this.getDeviceId(label)
    const audio = new Audio()
    const audioContext = new AudioContext()
    const source = audioContext.createMediaElementSource(audio)

  },
  mic: function (label: string) {
    const deviceId = this.getDeviceId(label)
    app.glagolVC.glagolManager?.changeDevices(deviceId, 'audio')
  },
  camera: function (label: string) {
    const deviceId = this.getDeviceId(label)
    app.glagolVC.glagolManager.changeDevices(deviceId, 'video')
  },
  getDeviceId: (label: string) => {
    let deviceId ='default'
    app.glagolVC.webRtc.getSenders().forEach((sender: RTCRtpSender) => {
      if (sender.track !== null)
        if (sender.track?.label === label) deviceId=sender.track?.id
    })
    return deviceId
  }
}

export { changeDevices }
