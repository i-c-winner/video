const config = {
  conference: {
    videoEnabled: false,
    audioEnabled: true,
    videoQuantity: 'VIDEO_MIDDLE'
  },
  UI: {
    chatBoxVisible: false,
    position: 'VERTICAL' as 'VERTICAL'|'HORIZONTAL'
  },
  modal: {
    width: 'WIDTH_MIDDLE',
    openModal: false,
    type: '',
    settings: {
      tabs: ['audio' , 'video', 'user'],
      selectedTab: undefined
    }
  }
};

export { config };
