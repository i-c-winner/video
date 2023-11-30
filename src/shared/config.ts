const config = {
  chatsBoxVisible: false,
  toolboxVisible: true,
  modalIsOpen: false,
  typeModal: 'error',
  tileMode: false,
  isRecording: false,
  remoteBoxVisible: false,
  conference: {
    quality: {
      video: 'low',
      audio: 'enabled'
    }
  },
  boxes: {
    remoteStreamBox:{
      width: '300px',
    },
    chatsbox: {
      width: '300px'
    }
  }
};
const constants = {
  icon: {
    buttonIcon: {
      width: "25px",
      height: "25px",
      viewBox: '0 0 25 25'
    }
  },

  modal: {
    WIDTH_HEIGHT: '900px',
    WIDTH_MIDDLE: '700px',
    WIDTH_LOW: '400px'
  },
  videoQuantity: {
    height: {
      width: 800,
      height: 520,
      frameRate: 60
    },
    middle: {
      width: 640,
      height: 480,
      frameRate: 50,
    },
    low: {
      width: 320,
      height: 240,
      frameRate: 30
    },
  }
};

export { constants, config };
