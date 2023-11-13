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

interface IParamsConference {
  userNode: string,
  displayName: string,
  roomName: string,
}

interface ISource {
  sharing: undefined | string,
  remoteStreams: string[]
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

export type { IInterface, IStore, IChats, TChat, ISource, IConfig, TCallbackConference, IParamsConference };
