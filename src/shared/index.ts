import { TCallback } from "./types";
import { IAudioQty, IVideoQty } from "../widgets/type";

type TSendMessage = (message: Strophe.Builder) => void;

interface IGlagol {
  listener: {
    [key: string]: TCallback[];
  };
  params: {
    userNode: string;
    roomName: string;
    displayName: string;
  };
  applyConstraints: (data: {
    type: "audio" | "video";
    value: keyof IAudioQty | keyof IVideoQty;
  }) => void;
  peerConnection: RTCPeerConnection;
  connection: any;
  connectionAddHandlers: () => void;
  peerConnectionAddHandlers: () => void;
  createConference: () => Promise<any>;
  roomInstance: {
    create: () => void;
    validate: () => void;
    invite: () => void;
  };
  streamsWasChanged: (description: string) => void;
  sendMessage: (message: Strophe.Builder) => void;
  currentLocalStream: MediaStream | null;
  changeTrack: (label: string, type: string) => void;
  on: (name: string, callback: TCallback) => void;
  off: (name: string) => void;
  emit: (name: string, args?: any) => void;
}

export type { IGlagol, TSendMessage };
