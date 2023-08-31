interface Glagol {
  userNode: string,
  userDisplayName: string,
  roomName: string,
  currentStreams: {
    [key: string]: {
      audio: MediaStreamTrack|null,
      video: MediaStreamTrack|null
    }
  },
  localStream: MediaStream|null
}
export type {Glagol}
