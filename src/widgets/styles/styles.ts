import { config } from '../../shared/config';

const styles = {
  topPanelLayer: {

    panel: {
      height: '50px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }
  },
  remoteStreamLayer: {
    flexFlow: 'row-reverse',
    pointerEvents: 'none',
    wrapper: {
      backgroundColor: 'rgba(25, 25, 25, .3)',
      width: config.boxes.remoteStreamBox.width,
      height: '100vh',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between',
      position: 'relative',
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
    bgcolor: 'background.paper',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexGrow: '1',
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
    pointerEvents: 'none',
    chatsbox: {
      backgroundColor: 'rgba(25, 25, 25, .3)',
      width: config.boxes.chatsbox.width,
      height: '100vh',
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
    textAlign: 'bottom',
    toolbox: {
      pointerEvents: 'initial',
      padding: '5px 20px',
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: '#4b4b4b'
    }
  }


};
export { styles };
