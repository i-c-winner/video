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
  }
}

interface IMyTrack extends MediaStreamTrack {
  iSharingScreen?: boolean
}
interface IMySender extends RTCRtpSender {
  track: IMyTrack
}
export type {IOptions, IMyTrack, IMySender}
