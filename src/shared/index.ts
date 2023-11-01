interface IGlagol {
  params: {
    userNode: string,
    roomName: string,
    displayName: string
  },
  peerConnection: RTCPeerConnection,
  connection: any,
  connectionAddHandlers: ()=>void,
  peerConnectionAddHandlers: ()=>void,
  createConference: ()=> Promise<any>,
  roomInstance: {
    create: (params: { roomName?: string, userNode?: string }) => void,
    validate: (params: { roomName?: string, userNode?: string })=>void,
    invite:  (params: { roomName?: string, displayName?: string })=>void,
  },
  setLocalStream: ()=>Promise<MediaStream>
}

export type { IGlagol };
