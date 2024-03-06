interface IOptions {
  xmppUrl: string,
  roomName: string,
  displayName: string
  webUrl: {
    iceCandidatePoolSize: number,
    iceServers: {
      urls: string,
      username?: string,
      credential?: string
    }[]
  },
  params: {
    videoQuality: MediaTrackConstraints,
    cameraIsWorking: boolean,
    microphoneIsWorking: boolean
  }
}
type TQuantity= 'height'| 'middle'| 'low'

interface IMyTrack extends MediaStreamTrack {
  iSharingScreen?: boolean
}
interface IMySender extends RTCRtpSender {
  track: IMyTrack
}
export type {IOptions, IMyTrack, IMySender, TQuantity}
