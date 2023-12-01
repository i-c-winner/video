import { config } from '../../shared/config';

const styles = {
  topPanelLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-20',
    pointerEvents: 'none',
    panel: {
      height: '50px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px'
    }
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
      left: '50px',
    },
    menu: {
      color: '#4b4b4b',
      backgroundColor: 'rgba(255, 255, 255, .5)',
      padding: '6px',
      border: '1px solid #4b4b4b',
      margin: '0'
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
      justifyContent: 'flex-end'
    },
    chatInputField: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '5px',
      backgroundColor: 'black',
      pointerEvents: 'initial',
      display: 'flex',
      justifyContent: 'space-between',
      flexFlow: 'column'
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
