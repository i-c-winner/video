interface Glagol {
  userNode: string,
  userDisplayName: string,
  roomName: string,
  currentStreams: {
    [key: string]: {
      audio: MediaStreamTrack|null,
      video: MediaStreamTrack|null
    }
  }
}
export type {Glagol}
