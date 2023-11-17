import { Box, Button } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';
import { changeChatsBox, changeTypeModal } from '../../app/store/interfaceSlice';
import { iconChat, iconSettings, iconSharing } from '../../shared/img/svg';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';
import { addSharing } from '../../app/store/sourceSlice';
import { openModal } from '../../app/store/interfaceSlice';
import { ModalWindow } from '../modal/ModalWindow';
import { IInterface } from '../../app/types';
import { CreateButtonWithIcon } from '../../entity/model/UI/button/CreateButtonWithIcon';
import { useState, useEffect } from 'react';

function Toolbox() {
  const dispatch = useDispatch();
  const [ chatButtonStyle, setChatButtonStyle ] = useState<{ [key: string]: string }>({});
  const { toolboxVisible, chatsBoxVisible, modalIsOpen } = useSelector((state: IStore) => state.interface);

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
    // dispatch(removeSharing())
    sharing.stop();
  }

  function openChatsBox() {
    dispatch(changeChatsBox(!chatsBoxVisible));
  }

  function openingModal(this: { type: IInterface['typeModal'] }) {
    dispatch(changeTypeModal(this.type));
    dispatch(openModal(!modalIsOpen));
  }

  useEffect(() => {
    if (chatsBoxVisible) {
      setChatButtonStyle({ color: 'red' });
    } else {
      setChatButtonStyle({});
    }

  }, [ chatsBoxVisible ]);

  return <Box sx={styles.toolboxLayer}>
    <ModalWindow/>
    {toolboxVisible && <Box sx={styles.toolboxLayer.toolbox}>
      <CreateButtonWithIcon
        variant="contained"
        classes={{
          startIcon: 'margin_zero'
        }}
        styles={{ otherRules: chatButtonStyle }} startIcon={iconChat} action={openChatsBox}/>
      <CreateButtonWithIcon
        variant="contained"
        sizes={{
          viewBox: '0 0 30 30',
        }
        }
        classes={{
          startIcon: 'margin_zero'
        }}
        startIcon={iconSharing} action={sharingStart}/>
      <CreateButtonWithIcon
        sizes={{
          viewBox: '0 0 30 30',
        }
        }
        variant="contained"
        classes={{
          startIcon: 'margin_zero'
        }}
        styles={{ otherRules: chatButtonStyle }} startIcon={iconSharing} action={sharingStop}/>
      <CreateButtonWithIcon
        variant="contained"
        classes={{
          startIcon: 'margin_zero'
        }}
        styles={{ otherRules: chatButtonStyle }} startIcon={iconSettings} action={openingModal}/>
    </Box>
    }
  </Box>;
}

export { Toolbox };
