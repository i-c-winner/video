import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';
import { changeChatsBox, changeTypeModal, toggleTileMode } from '../../app/store/interfaceSlice';
import { iconChat, iconSettings, iconSharing, iconTile } from '../../shared/img/svg';
import { addSharing } from '../../app/store/sourceSlice';
import { openModal } from '../../app/store/interfaceSlice';
import { ModalWindow } from '../modal/ModalWindow';
import { IInterface } from '../../app/types';
import { ButtonWithIcon } from '../../entity/model/UI/button/ButtonWithIcon';
import { useEffect, useState } from 'react';
import { ButtonWithText } from '../../entity/model/UI/button/ButtonWithText';
import { IStyle } from '../type';


function Toolbox() {
  const defaultButtonsStyle = {};
  const dispatch = useDispatch();
  const { toolboxVisible, chatsBoxVisible, modalIsOpen, tileMode } = useSelector((state: IStore) => state.interface);
  const [ styleChatButton, setStyleChatButton ] = useState<IStyle>(defaultButtonsStyle);

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

  useEffect(() => {
    if (chatsBoxVisible) {
      setStyleChatButton({ color: 'orange' });
    } else {
      setStyleChatButton(defaultButtonsStyle);
    }
  }, [ chatsBoxVisible ]);

  return <Box sx={styles.toolboxLayer}>
    <ModalWindow/>
    {toolboxVisible && <Box sx={styles.toolboxLayer.toolbox}>
      <ButtonWithIcon
        styles={styleChatButton}
        variant="contained"
        classes={{
          startIcon: 'margin_zero'
        }}
        startIcon={iconChat} action={openChatsBox}/>
      <ButtonWithIcon
        variant="contained"
        sizes={{
          viewBox: '0 0 30 30',
        }
        }
        classes={{
          startIcon: 'margin_zero'
        }}
        startIcon={iconSharing} action={sharingStart}/>
      <ButtonWithText variant="contained" text={'stop'} action={sharingStop}/>
      <ButtonWithIcon
        classes={{
          startIcon: 'margin_zero'
        }}
        variant="contained" sizes={{viewBox: '18 18 25 25'}} startIcon={iconTile} action={changeTileMode}/>
      <ButtonWithIcon
        variant="contained"
        classes={{
          startIcon: 'margin_zero'
        }}
        startIcon={iconSettings} action={openingModal.bind({ type: 'settings' })}/>
    </Box>
    }
  </Box>;
}

export { Toolbox };
