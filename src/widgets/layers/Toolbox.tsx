import { Box, Button } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { useDispatch } from 'react-redux';
import { changeChatsBox, changeTypeModal } from '../../app/store/interfaceSlice';
import { iconChat, iconSettings, iconSharing } from '../../shared/img/svg';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';
import { addSharing } from '../../app/store/sourceSlice';
import { openModal } from '../../app/store/interfaceSlice';
import { ModalWindow } from '../modal/ModalWindow';
import { IInterface } from '../../app/types';
function Toolbox() {
  const dispatch = useDispatch();
  const { toolboxVisible, chatsBoxVisible, modalIsOpen } = useSelector((state: IStore) => state.interface);

  function sharingStart() {
    sharing.start().then((stream) => {
      dispatch(addSharing({
        type: 'dashboard',
        id: stream.id
      }));
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

  return <Box sx={styles.toolboxLayer}>
    <ModalWindow />
    {toolboxVisible && <Box sx={styles.toolboxLayer.toolbox}>
      <Button
        startIcon={<CreateSvgIcon icon={iconChat}/>}
        classes={{
          startIcon: 'margin_zero'
        }
        }
        variant="contained" onClick={openChatsBox}/>
      <Button
        variant="contained" onClick={sharingStart}
        classes={{
          startIcon: 'margin_zero'
        }}
        startIcon={<CreateSvgIcon
          sizes={{
            viewBox: '0 0 30 30'
          }}
          icon={iconSharing}/>}
      />
      <Button variant="contained" onClick={sharingStop}>stop</Button>
      <Button
        classes={{
          startIcon: 'margin_zero'
        }}
        startIcon={<CreateSvgIcon icon={iconSettings}/>}
        variant="contained"
        onClick={openingModal.bind({ type: 'settings' })}
      />
    </Box>
    }
  </Box>;
}

export { Toolbox };
