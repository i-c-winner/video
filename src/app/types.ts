interface IConfig {
  conference: {
    user: {
      roomName: string,
      userName: string,
      userNode: string,
      displayName: string
    },
    loginin: boolean
  };
}

type TCallbackConference = (name: string, args?: any[]) => void
type TStream = {
  id: string,
  type: string
}
interface IParamsConference {
  userNode: string,
  displayName: string,
  roomName: string,
}

interface ISource {
  sharing: undefined | TStream,
  remoteStreams: TStream[]
}

type TChat = {
  author: string,
  id: string,
  text: string
}

interface IChats {
  chatsList: TChat[];
}

interface IInterface {
  chatsBoxVisible: boolean,
  toolboxVisible: boolean
}

interface IStore {
  source: ISource,
  chats: IChats,
  interface: IInterface
}

export type {TStream, IInterface, IStore, IChats, TChat, ISource, IConfig, TCallbackConference, IParamsConference };
