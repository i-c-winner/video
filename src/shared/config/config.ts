const config = {
  conference: {
    videoQuantity: 'VIDEO_MIDDLE',
    audioQuantity: 'sample'
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
