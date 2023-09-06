const config = {
  conference: {
    videoQuantity: 'VIDEO_MIDDLE',
    audioQuantity: 'enabled'
  },
  UI: {
    chatBoxVisible: false,
    disposition: 'VERTICAL' as 'VERTICAL'|'HORIZONTAL'
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
