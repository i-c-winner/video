type TSendMessage= (message: Strophe.Builder)=>void
type TRendering=()=>void
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
  streamsWasChanged: (description: string)=>void,
  sendMessage:(message: Strophe.Builder)=>void
  setLocalStream: ()=>Promise<MediaStream>
  setRendering: (render: TRendering)=>void
  renderingFunction?: TRendering,
}

export type { IGlagol, TSendMessage };
