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
    width: {
      xl: '900px',
      md: '750px',
      ls: '400px'
    },
    openModal: true,
    type: '',
    settings: {
      tabs: ['audio' , 'video', 'user'],
      selectedTab: undefined
    }
  }
};

export { config };
