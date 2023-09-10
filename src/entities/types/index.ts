interface Glagol {
  userNode: string,
  userDisplayName: string,
  roomName: string,
  currentStreams: {
    [key: string]: {
      audio: MediaStreamTrack|null,
      video: MediaStreamTrack|null,
      stream: MediaStream
    }
  },
  localStream: MediaStream|null,
  localStreamForPeer: MediaStream| null,
  recorder?: any
}
export type {Glagol}
