interface IOptions {
  xmppUrl: string;
  roomName: string;
  displayName: string;
  webUrl: {
    iceCandidatePoolSize: number;
    iceServers: {
      urls: string;
      username?: string;
      credential?: string;
    }[];
  };
}

type TQuantity = "height" | "middle" | "low";

interface IMyTrack extends MediaStreamTrack {
  iSharingScreen?: boolean;
  hasOwn?: (args: "iSharingScreen") => boolean;
}

interface IMySender extends RTCRtpSender {
  track: IMyTrack;
}

export type { IOptions, IMyTrack, IMySender, TQuantity };
