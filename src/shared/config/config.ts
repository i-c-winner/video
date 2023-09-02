const config = {
  icon: {
    buttonIcon: {
      width: "32px",
      height: "32px"
    }
  },
  UI: {
    chatBoxVisible: false
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
