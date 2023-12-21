import { Box, Tooltip } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';
import {
  changeAudio,
  changeChatsBox,
  changeIsRecording,
  changeTypeModal,
  changeVideo,
  toggleTileMode
} from '../../app/store/interfaceSlice';
import {
  iconChat,
  iconPlus,
  iconSettings,
  iconSharing,
  iconTile,
  iconExit,
  iconCamera,
  iconCameradisabled,
  iconMicrophone,
  iconRecordStart,
  iconRecordStop,
  iconMicOff
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
import { Recording } from '../../features/manager/record';
import { selectingButtons } from '../../features/utils/selectingButtons';
import { IIcon } from '../type';
import { glagol } from '../../entity/conference/glagol';
import { useNavigate } from 'react-router-dom';

let recording: null | Recording = null;

function Toolbox() {
  const defaultButtonsStyle = { color: 'white' };
  const dispatch = useDispatch();
  const qualityVideo = useSelector((state: IStore) => state.interface.conference.quality.video);
  const qualityAudio = useSelector((state: IStore) => state.interface.conference.quality.audio);
  const { files } = useSelector((state: IStore) => state.files);
  const { isRecording } = useSelector((state: IStore) => state.interface);
  const [ currentIconRecord, setCurrentIconRecord ] = useState<IIcon>(iconRecordStart);
  const { toolboxVisible, chatsBoxVisible, modalIsOpen, tileMode } = useSelector((state: IStore) => state.interface);
  const [ styleChatButton, setStyleChatButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ styleTileButton, setStyleTileButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ styleRecordButton, setStyleRecordButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ styleSharingButton, setStyleSharingButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ stylesFilesButton, setStylesFilesButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ submenuForCameraOpen, setSubmenuForCaMeraOpen ] = useState<boolean>(false);
  const [ currentIconMicrophone, setCurrentIconMicrophone ] = useState<IIcon>(iconMicrophone);
  const [ currentIconCamera, setCurrentIconCamera ] = useState<IIcon>(iconCamera);
  const [ sharingState, setSharingState ] = useState<boolean>(false);
  const navigate=useNavigate();

  const centerButtons = {
    file: <ButtonWithIcon
      key={getRandomText(5)}
      styles={stylesFilesButton}
      wrapperStyles={{ margin: '5px 10px' }}
      variant="text"
      sizes={{
        // viewBox: '0 0 30 30',
      }
      }
      classes={{
        startIcon: 'margin_zero'
      }}
      startIcon={iconPlus}
      tooltipKey="file"
      action={openingModal.bind({ type: 'file' })}
    />,
    sharing: <ButtonWithIcon
      key="sharing"
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
      startIcon={iconSharing} action={sharingAction}
      tooltipKey="sharing"
    />,
    tileMode: <ButtonWithIcon
      key="tileMode"
      wrapperStyles={{ margin: '5px 10px' }}
      classes={{
        startIcon: 'margin_zero'
      }}
      styles={styleTileButton}
      variant="text" sizes={{ viewBox: '18 18 25 25' }} startIcon={iconTile} action={changeTileMode}
      tooltipKey="tile"
    />,
    camera: <ButtonWithSubmenu
      styles={defaultButtonsStyle}
      openSubmenu={openingSubmenu}
      key={getRandomText(5)}
      wrapperStyles={{ margin: '5px 10px' }}
      sizes={getViewBoxForVideoIcon()}
      classes={{
        startIcon: 'margin_zero'
      }
      }
      variant="text" startIcon={currentIconCamera} action={toggledCamera}
      tooltipKey="camera"
    >
      {submenuForCameraOpen && <SubmenuForCamera/>}
    </ButtonWithSubmenu>,
    microphone: <ButtonWithSubmenu
      styles={defaultButtonsStyle}
      openSubmenu={openingSubmenu}
      key={getRandomText(5)}
      wrapperStyles={{ margin: '5px 10px' }}
      sizes={getViewBoxForAudioIcon()}
      classes={{
        startIcon: 'margin_zero'
      }
      }
      variant="text" startIcon={currentIconMicrophone} action={toggledMicrophone}
      tooltipKey="microphone"
    >
      {submenuForCameraOpen && <SubmenuForCamera/>}
    </ButtonWithSubmenu>,
    settings: <ButtonWithIcon
      key={getRandomText(5)}
      styles={defaultButtonsStyle}
      wrapperStyles={{ margin: '5px 10px' }}
      variant="text"
      classes={{
        startIcon: 'margin_zero'
      }}
      startIcon={iconSettings} action={openingModal.bind({ type: 'settings' })}
      tooltipKey="settings"
    />,
    record: <ButtonWithIcon
      key={getRandomText(5)}
      styles={styleRecordButton}
      wrapperStyles={{ margin: '5px 10px' }}
      variant="text"
      classes={{
        startIcon: 'margin_zero'
      }}
      startIcon={currentIconRecord} action={actionRecording}
      tooltipKey="record"
    />
  };

  type TButtons = keyof typeof centerButtons
  const keysByCenterButtons = Object.keys(centerButtons) as TButtons[];
  const activeCenterButtons: TButtons[] = [ 'settings', 'file', 'record', 'tileMode', 'sharing', 'camera', 'microphone' ];
  const currentCenterButtons = selectingButtons(keysByCenterButtons, activeCenterButtons) as TButtons[];

  function sharingAction() {
    if (sharingState) {
      sharingStop();
      setStyleSharingButton(defaultButtonsStyle);
      setSharingState(false);
    } else {
      sharingStart();
      setSharingState(true);
    }
  }

  function sharingStart() {
    sharing.start().then((stream) => {
      if (stream) {
        dispatch(addSharing({
          type: 'dashboard',
          id: stream.id
        }));
        setStyleSharingButton({
          ...defaultButtonsStyle,
          color: 'red'
        });
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

  function getViewBoxForVideoIcon() {
    if (qualityVideo === 'disabled') {
      return {
        viewBox: '17 18 25 25',
      };
    }
    return { viewBox: '0 0 22 22' };
  }

  function getViewBoxForAudioIcon() {
    return { viewBox: '0 0 22 22' };
  }

  function actionRecording() {
    dispatch(changeIsRecording(!isRecording));
  }

  function toggledMicrophone() {
    if (qualityAudio === 'enabled') {
      dispatch(changeAudio('disabled'));
      setCurrentIconMicrophone(iconMicOff);
    } else {
      dispatch(changeAudio('enabled'));
      setCurrentIconMicrophone(iconMicrophone);
    }
  }

  function getHeightToolbox() {
    if (window.screen.width > 720) {
      return {
        ...styles.toolboxLayer.toolbox,
        height: '40px'
      };
    } else {
      return {
        ...styles.toolboxLayer.toolbox,
        height: '70px'
      };
    }
  }

  function exit() {
    glagol.peerConnection.close();
    navigate('/exit')

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
    setStylesFilesButton(files.length > 0 ? { color: 'red' } : defaultButtonsStyle);
  }, [ chatsBoxVisible, tileMode, files ]);
  useEffect(() => {
    if (isRecording) {
      setStyleRecordButton(() => {
        return {
          ...defaultButtonsStyle,
          color: 'red'
        };
      });
      setCurrentIconRecord(iconRecordStop);
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
      setStyleRecordButton(defaultButtonsStyle);
      setCurrentIconRecord(iconRecordStart);
      if (recording !== null) {
        recording.stop();
      }
    }
  }, [ isRecording ]);


  return <Box sx={styles.toolboxLayer}>
    <ModalWindow/>
    {toolboxVisible && <Box sx={getHeightToolbox()}>
      <Box>
        <ButtonWithIcon
          wrapperStyles={{ margin: '5px 10px' }}
          styles={styleChatButton}
          variant="text"
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={iconChat} action={openChatsBox}
          tooltipKey="chat"
        />
      </Box>
      <Box sx={{
        flexGrow: '1',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {currentCenterButtons.map((button) => {
          return centerButtons[button];
        })}
      </Box>
      <Box>
        <ButtonWithIcon
          key={getRandomText(5)}
          variant="text"
          sizes={{
            viewBox: '0 0 80 25',
            width: '80px',
            height: '25px'
          }
          }
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={iconExit}
          tooltipKey="exit"
          action={exit}
        />
      </Box>
    </Box>
    }
  </Box>;
}

export { Toolbox };
