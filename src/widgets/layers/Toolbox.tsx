import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';
import {
  changeChatsBox,
  changeIsRecording,
  changeTypeModal,
  changeVideo,
  toggleTileMode
} from '../../app/store/interfaceSlice';
import {
  iconChat,
  iconSettings,
  iconSharing,
  iconTile,
  iconCamera,
  iconCameradisabled,
  iconMicrophone,
  iconRecordStart, iconRecordStop
} from '../../shared/img/svg';
import { addSharing } from '../../app/store/sourceSlice';
import { openModal } from '../../app/store/interfaceSlice';
import { ModalWindow } from '../modal/ModalWindow';
import { IInterface } from '../../app/types';
import { ButtonWithIcon } from '../../entity/model/UI/button/ButtonWithIcon';
import { useEffect, useState } from 'react';
import { IStyle } from '../type';
import { ButtonWithSubmenu } from '../../entity/model/UI/button/ButtonWithSubmenu';
import { SubmenuForCamera } from '../../entity/model/UI/button/submenuForCamera';
import { config } from '../../shared/config';
import { getRandomText } from '../../features/plugins/getRandomText';
import {Recording} from '../../features/manager/record';

let recording: null|Recording=null
interface IIcon {
  attributes: {
    [key: string]: string
  },
  content: string,

}

function Toolbox() {
  const defaultButtonsStyle = { color: 'white' };
  const dispatch = useDispatch();
  const qualityVideo = useSelector((state: IStore) => state.interface.conference.quality.video);
  const {isRecording}=useSelector((state: IStore)=>state.interface)
  const [currentIconRecord, setCurrentIconRecord]= useState<IIcon>(iconRecordStart)
  const { toolboxVisible, chatsBoxVisible, modalIsOpen, tileMode } = useSelector((state: IStore) => state.interface);
  const [ styleChatButton, setStyleChatButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ styleTileButton, setStyleTileButton ] = useState<IStyle>(defaultButtonsStyle);
  const[styleRecordButton, setStyleRecordButton]=useState<IStyle>(defaultButtonsStyle)
  const [ styleSharingButton, setStyleSharingButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ submenuForCameraOpen, setSubmenuForCaMeraOpen ] = useState<boolean>(false);
  const [currentIconMicrophone, setCurrentIconMicrophone]= useState<IIcon>(iconMicrophone)
  const [ currentIconCamera, setCurrentIconCamera ] = useState<IIcon>(iconCamera);
  const [sharingState, setSharingState]=useState<boolean>(false)

  function sharingAction() {
    if (sharingState) {
      sharingStop()
      setStyleSharingButton(defaultButtonsStyle)
      setSharingState(false)
    } else {
      sharingStart()
    setSharingState(true)
      setStyleSharingButton({
        ...defaultButtonsStyle,
        color: 'red'
      })
    }
  }
  function sharingStart() {
    sharing.start().then((stream) => {
      if (stream) {
        dispatch(addSharing({
          type: 'dashboard',
          id: stream.id
        }));
      } else {
        console.info('Sharing is aborting');
      }
    });
  }

  function sharingStop() {
    sharing.stop();
  }

  function openChatsBox() {
    dispatch(changeChatsBox(!chatsBoxVisible));
  }

  function openingModal(this: { type: IInterface['typeModal'] }) {
    dispatch(changeTypeModal(this.type));
    dispatch(openModal(!modalIsOpen));
  }

  function changeTileMode() {
    dispatch(toggleTileMode(!tileMode));
  }

  function toggledCamera() {

    if (qualityVideo !== 'disabled') {
      dispatch(changeVideo('disabled'));
    } else {
      dispatch(changeVideo(config.conference.quality.video));
    }
  }
  function openingSubmenu() {
    setSubmenuForCaMeraOpen(!submenuForCameraOpen);
  }
  function getViewBox() {
     if (qualityVideo==='disabled') {
     return {viewBox: '17 18 25 25'}
  } return {viewBox: '0 0 22 22'}
}

function actionRecording() {
    dispatch(changeIsRecording(!isRecording))
  }


  useEffect(() => {
    if (qualityVideo !== 'disabled') {
      setCurrentIconCamera(iconCamera);
    } else {
      setCurrentIconCamera(iconCameradisabled);
    }
  }, [ qualityVideo ]);
  useEffect(() => {
    setStyleChatButton(chatsBoxVisible ? { color: 'green' } : defaultButtonsStyle);
    setStyleTileButton(tileMode ? { color: 'green' } : defaultButtonsStyle);
  }, [ chatsBoxVisible, tileMode ]);
  useEffect(() => {
    if (isRecording) {
      setStyleRecordButton(()=>{
        return {
          ...defaultButtonsStyle,
          color: 'red'
        }
      })
      setCurrentIconRecord(iconRecordStop)
      const rec = new Recording();
      rec.init().then((result) => {
        rec.createRecorder(result);
        rec.createListeners();
        rec.start();
        recording = rec;
      }).catch((error) => {
        dispatch(changeIsRecording(false));
      });
    } else {
      setStyleRecordButton(defaultButtonsStyle)
      setCurrentIconRecord(iconRecordStart)
      if (recording !== null) {
        recording.stop();
      }
    }
  }, [ isRecording ]);


  return <Box sx={styles.toolboxLayer}>
    <ModalWindow/>
    {toolboxVisible && <Box sx={styles.toolboxLayer.toolbox}>
      <Box>
        <ButtonWithIcon
          wrapperStyles={{ margin: '5px 10px' }}
          styles={styleChatButton}
          variant="text"
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={iconChat} action={openChatsBox}/>
      </Box>
      <Box sx={{
        flexGrow: '1',
        display: 'flex',
        justifyContent: 'center'
      }}>

        <ButtonWithIcon
          styles={styleSharingButton}
          wrapperStyles={{ margin: '5px 10px' }}
          variant="text"
          sizes={{
            viewBox: '0 0 30 30',
          }
          }
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={iconSharing} action={sharingAction}/>
        <ButtonWithIcon
          wrapperStyles={{ margin: '5px 10px' }}
          classes={{
            startIcon: 'margin_zero'
          }}
          styles={styleTileButton}
          variant="text" sizes={{ viewBox: '18 18 25 25' }} startIcon={iconTile} action={changeTileMode}/>
        <ButtonWithSubmenu
          styles={defaultButtonsStyle}
          openSubmenu={openingSubmenu}
          key={getRandomText(5)}
          wrapperStyles={{ margin: '5px 10px' }}
          sizes={getViewBox()}
          classes={{
            startIcon: 'margin_zero'
          }
          }
          variant="text" startIcon={currentIconCamera} action={toggledCamera}>
          {submenuForCameraOpen && <SubmenuForCamera/>}
        </ButtonWithSubmenu>
        <ButtonWithSubmenu
          styles={defaultButtonsStyle}
          openSubmenu={openingSubmenu}
          key={getRandomText(5)}
          wrapperStyles={{ margin: '5px 10px' }}
          sizes={getViewBox()}
          classes={{
            startIcon: 'margin_zero'
          }
          }
          variant="text" startIcon={currentIconMicrophone} action={toggledCamera}>
          {submenuForCameraOpen && <SubmenuForCamera/>}
        </ButtonWithSubmenu>
        <ButtonWithIcon
          styles={defaultButtonsStyle}
          wrapperStyles={{ margin: '5px 10px' }}
          variant="text"
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={iconSettings} action={openingModal.bind({ type: 'settings' })}/>
        <ButtonWithIcon
          key={getRandomText(5)}
          styles={styleRecordButton}
          wrapperStyles={{ margin: '5px 10px' }}
          variant="text"
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={currentIconRecord} action={actionRecording}/>

      </Box>

    </Box>
    }
  </Box>;
}

export { Toolbox };
