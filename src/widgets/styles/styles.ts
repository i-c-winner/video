import { config } from '../../shared/config'

const styles = {
  topPanelLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-20',
    pointerEvents: 'none'
  },
  remoteStreamLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-30',
    display: 'flex',
    flexFlow: 'row-reverse',
    pointerEvents: 'none',
    wrapper: {
      backgroundColor: 'rgba(25, 25, 25, .3)',
      boxShadow: '0 0 5px 5px green',
      width: config.boxes.remoteStreamBox.width,
      height: '100vh',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between',
      displayName: {
        position: 'absolute',
        bottom: '5px',
        left: '5px',
        padding: '2px',
        backgroundColor: 'rgba(225, 225, 225, .5)'
      }
    }
  },
  remoteStream: {
    width: '90%',
    boxShadow: '0 0 5px 5px green',
    backgroundColor: 'yellow',

  },
  localeStyleLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-40',
    bgcolor: 'background.paper',
    color: 'white',
    display: 'flex',
    logo: {
      position: 'absolute',
      top: '50px',
      left: '50px'
    }
  },
  chatsboxLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-10',
    pointerEvents: 'none',
    chatsbox: {
      backgroundColor: 'rgba(25, 25, 25, .3)',
      width: config.boxes.chatsbox.width,
      boxSizing: 'border-box',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between'
    },
    chatInputField: {
      width: '100%',
      height: '150px',
      backgroundColor: 'rgba(98, 225, 25, .3)',
      pointerEvents: 'initial'
    }
  },

  toolboxLayer: {
    pointerEvents: 'none',
    display: 'flex',
    flexFlow: 'column-reverse',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    textAlign: 'bottom',
    toolbox: {
      pointerEvents: 'initial',
      height: '40px',
      padding: '5px 20px',
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: '#4b4b4b'
    }
  }


};
export { styles };
