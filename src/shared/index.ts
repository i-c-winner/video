type TSendMessage= (message: Strophe.Builder)=>void
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
    create: () => void
    validate: ()=>void,
    invite:  ()=>void,
  },
  sendMessage:(message: Strophe.Builder)=>void
  setLocalStream: ()=>Promise<MediaStream>
}

export type { IGlagol, TSendMessage };
