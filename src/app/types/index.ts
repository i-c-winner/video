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
    remoteStreams: MediaStream[]
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
      remoteBoxIsVisible: boolean,
      sharingScreenIsOpen: boolean
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
      isRecording: boolean,
      itHasSharingStream: null|MediaStream
    },
  },
  chat: TChats
}

export type {
  IStreams, IChat, TChats, IRootState
};
