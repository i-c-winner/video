const config = {
  conference: {
    videoQuantity: 'middle',
    audioStream: true,
    leftOut: false
  },
  UI: {
    chatBoxVisible: false,
    disposition: 'VERTICAL' as 'VERTICAL'|'HORIZONTAL',
    tile: false,
    toolboxIsVisible: true,
    remoteBoxIsVisible: false,
    widthRemoteBox: '',
    sharingScreen: false
  },
  modal: {
    width: 'WIDTH_MIDDLE',
    openModal: false,
    type: '',
    settings: {
      tabs: ['audio' , 'video', 'user'],
      selectedTab: 0
    },
    record: {
      state: false
    }
  },
  functions: {
    isRecording: false,
  }
};

export { config };
