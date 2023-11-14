import { TCallback } from './types';

type TSendMessage = (message: Strophe.Builder) => void

interface IGlagol {
  listener: {
    [key: string]: TCallback[]
  },
  params: {
    userNode: string,
    roomName: string,
    displayName: string
  },
  peerConnection: RTCPeerConnection,
  connection: any,
  connectionAddHandlers: () => void,
  peerConnectionAddHandlers: () => void,
  createConference: () => Promise<any>,
  roomInstance: {
    create: () => void
    validate: () => void,
    invite: () => void,
  },
  streamsWasChanged: (description: string) => void,
  sendMessage: (message: Strophe.Builder) => void
  setLocalStream: () => Promise<MediaStream>
  currentLocalStream: MediaStream | null,
  on: (name: string, callback: any) => void,
  emit: (name: string, args?: any) => void
}

export type { IGlagol, TSendMessage };
