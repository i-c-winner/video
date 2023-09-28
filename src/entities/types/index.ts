interface Glagol {
  userNode: string,
  userDisplayName: string,
  roomName: string,
  currentStreams: MediaStream[],
  localStream: MediaStream | null,
  localStreamForPeer: MediaStream | null,
  sharingStream: MediaStream | null
  recorder?: boolean
}

export type { Glagol };
