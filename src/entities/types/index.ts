interface Glagol {
  userNode: string,
  userDisplayName: string,
  roomName: string,
  currentStreams: {
    [key: string]:RTCSessionDescription | null
  }
}
export type {Glagol}
