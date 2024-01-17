import { config } from '../../shared/config';

const styles = {
  topPanelLayer: {
    height: '100px',
    padding: '0 0 16px 16px',
    boxSizing: 'border-box',
    bgColor: 'background.paper',
    borderRadius: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    panel: {
      height: '84px',
      padding: '0 16px',
      backgroundColor: 'background.windows',
      borderRadius: '1rem',
      border: '1px solid grey',
      display: 'flex',
      justifyContent: 'space-between',
      flexGrow: '1',
      alignItems: 'center'
    },
    logo: {
      color: 'green',
      paddingRight: '50px'
    },
  },
  remoteStreamLayer: {
padding: '16px',
    wrapper: {
      padding: '16px',
      backgroundColor: 'rgba(31, 39, 56)',
      width: config.boxes.remoteStreamBox.width,
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
    display: 'flex',
    padding: '16px',
    border: '1px grey solid',
    borderRight: '1px grey solid',
    borderRadius: '1rem',
    boxSizing: 'border-radius',

    menu: {
      color: '#4b4b4b',
      backgroundColor: 'rgba(255, 255, 255, .5)',
      padding: '6px',
      border: '1px solid #4b4b4b',
      margin: '0'
    }
  },
  chatsboxLayer: {

    chatsbox: {
      backgroundColor: 'background.windows',
      width: config.boxes.chatsbox.width,
      height: 'calc(100vh - 32px)',
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'flex-end',
      borderRadius: '1rem'
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
    boxSizing: 'border-box',
    height: '56px',
    toolbox: {
      pointerEvents: 'initial',
      padding: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'background.windows',
      height: '24px',
      borderRadius: '1rem',
    }
  }


};
export { styles };
