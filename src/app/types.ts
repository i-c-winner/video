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

export type { IConfig, TCallbackConference, IParamsConference };
