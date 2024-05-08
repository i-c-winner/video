import { IAudioQty, IVideoQty } from "../widgets/type";

interface IConfig {
  conference: {
    user: {
      roomName: string;
      userName: string;
      userNode: string;
      displayName: string;
    };
    loginin: boolean;
  };
}

type TCallbackConference = (name: string, args?: any[]) => void;
type TStream = {
  id: string;
  type: string;
};

interface IParamsConference {
  userNode: string;
  displayName: string;
  roomName: string;
}

interface ISource {
  sharing: undefined | TStream;
  remoteStreams: TStream[];
}

type TChat = {
  author: string;
  id?: string;
  text: string;
};

interface IChats {
  chatsList: TChat[];
}
interface IFiles {
  files: {
    idRemote: string;
    text: string;
  }[];
}

interface IInterface {
  chatsBoxVisible: boolean;
  toolboxVisible: boolean;
  modalIsOpen: boolean;
  tileMode: boolean;
  typeModal:
    | "error"
    | "settings"
    | "more"
    | "settingsVideo"
    | "fullScreen"
    | "allMute"
    | "file";
  isRecording: boolean;
  remoteBoxVisible: boolean;
  conference: {
    quality: {
      audio: keyof IAudioQty;
      video: keyof IVideoQty;
    };
  };
}

interface IStore {
  source: ISource;
  chats: IChats;
  interface: IInterface;
  files: IFiles;
}

export type {
  TStream,
  IInterface,
  IStore,
  IChats,
  TChat,
  ISource,
  IConfig,
  TCallbackConference,
  IParamsConference,
};
