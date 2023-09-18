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
      videoQuantity: string,
      audioStream: boolean,
      leftOut: boolean
    },
    UI: {
      chatBoxVisible: boolean,
      disposition: string,
      tile: boolean
    },
    modal: {
      width: string,
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
    chat: string[]
  }
}

export type {
  IStreams, IChat, TChats, IRootState
};
