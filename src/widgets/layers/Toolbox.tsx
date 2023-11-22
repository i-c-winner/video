import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';
import { changeChatsBox, changeTypeModal, toggleTileMode } from '../../app/store/interfaceSlice';
import { iconChat, iconSettings, iconSharing, iconTile, iconCamera } from '../../shared/img/svg';
import { addSharing } from '../../app/store/sourceSlice';
import { openModal } from '../../app/store/interfaceSlice';
import { ModalWindow } from '../modal/ModalWindow';
import { IInterface } from '../../app/types';
import { ButtonWithIcon } from '../../entity/model/UI/button/ButtonWithIcon';
import { useEffect, useState } from 'react';
import { ButtonWithText } from '../../entity/model/UI/button/ButtonWithText';
import { IStyle } from '../type';
import { ButtonWithSubmenu } from '../../entity/model/UI/button/ButtonWithSubmenu';
import { SubmenuForCamera } from '../../entity/model/UI/button/submenuForCamera';


function Toolbox() {
  const defaultButtonsStyle = { color: 'white' };
  const dispatch = useDispatch();
  const { toolboxVisible, chatsBoxVisible, modalIsOpen, tileMode } = useSelector((state: IStore) => state.interface);
  const [ styleChatButton, setStyleChatButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ styleTileButton, setStyleTileButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ styleSharingButton, setStyleSharingButton ] = useState<IStyle>(defaultButtonsStyle);
  const [ submenuForCameraOpen, setSubmenuForCaMeraOpen ] = useState<boolean>(false);

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

  function changeCameraSource() {
    setSubmenuForCaMeraOpen(!submenuForCameraOpen)
  }

  useEffect(() => {
    setStyleChatButton(chatsBoxVisible ? { color: 'green' } : defaultButtonsStyle);
    setStyleTileButton(tileMode ? { color: 'green' } : defaultButtonsStyle);
  }, [ chatsBoxVisible, tileMode ]);

  return <Box sx={styles.toolboxLayer}>
    <ModalWindow/>
    {toolboxVisible && <Box sx={styles.toolboxLayer.toolbox}>
      <Box>
        <ButtonWithIcon
          wrapperStyles={{ margin: '5px 10px' }}
          styles={styleChatButton}
          variant="outlined"
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
          variant="outlined"
          sizes={{
            viewBox: '0 0 30 30',
          }
          }
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={iconSharing} action={sharingStart}/>
        <ButtonWithText wrapperStyles={{ margin: '5px 10px' }} variant="outlined" text={'stop'} action={sharingStop}/>
        <ButtonWithIcon
          wrapperStyles={{ margin: '5px 10px' }}
          classes={{
            startIcon: 'margin_zero'
          }}
          styles={styleTileButton}
          variant="outlined" sizes={{ viewBox: '18 18 25 25' }} startIcon={iconTile} action={changeTileMode}/>
        <ButtonWithSubmenu
          
          wrapperStyles={{ margin: '5px 10px' }}
          sizes={{viewBox: '0 0 23 23'}}
          classes={{
            startIcon: 'margin_zero'
          }
          }
          variant="outlined" startIcon={iconCamera} action={changeCameraSource}>
          {submenuForCameraOpen && <SubmenuForCamera/>}
        </ButtonWithSubmenu>
        <ButtonWithIcon
          styles={defaultButtonsStyle}
          wrapperStyles={{ margin: '5px 10px' }}
          variant="outlined"
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={iconSettings} action={openingModal.bind({ type: 'settings' })}/>


      </Box>

    </Box>
    }
  </Box>;
}

export { Toolbox };
