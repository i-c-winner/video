interface IStreams {
  streamsId: string[];
}

interface IChat {
  author: string,
  time: string,
  text: string,
  id: string
}

type  TChats = IChat[]

interface IRootState {
  streams: {
    streamsId: string[]
  },
  config: {
    conference: {
      videoQuantity: 'height'| 'middle' | 'low' | 'disabled',
      audioStream: boolean,
      leftOut: boolean
    },
    UI: {
      chatBoxVisible: boolean,
      disposition: string,
      tile: boolean,
      toolboxIsVisible: boolean,
      remoteBoxIsVisible: boolean
    },
    modal: {
      width: 'WIDTH_HEIGHT' | 'WIDTH_MIDDLE' | 'WIDTH_LOW',
      openModal: boolean,
      type: string,
      settings: {
        tabs: [ 'audio', 'video', 'user' ],
        selectedTab: number,
      },
      record: {
        state: boolean
      }
    },
    functions: {
      isRecording: boolean
    },
  },
  chat: TChats
}

export type {
  IStreams, IChat, TChats, IRootState
};
