import React, { useRef } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { iconChat, iconSettings, iconExit } from '../../shared/img/svg';
import { CreateSvgIcon } from '../createSvgIcon/CreateSvgIcon';
import { toolboxAction } from '../../functions/buttonActions/toolboxAction';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatVisible, changeModalVisible, setTypeModal } from '../../app/store/configSlice';
import { Settings } from '../modal/settingsChildren/Settings';
import { constants } from '../../shared/config/constants';
function Toolbox() {
  interface IWidth {
    WIDTH_HEIGHT: string,
    WIDTH_MIDDLE: string,
    WIDTH_LOW: string
  }

  const refSettings = useRef<any>();
  const dispatch = useDispatch();
  const { openModal, settings, type } = useSelector((state: any) => {
    return state.config.modal;
  });
  const width: keyof IWidth = useSelector((state: any) => state.config.modal.width);
  const [ open, setOpen ] = useState<boolean>(openModal);

  const [ visible, setVisible ] = useState<boolean>(true);
  const baseStyle = {
    backgroundColor: 'background.paper',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  };

  function getStyleToolbox() {
    if (visible) {
      return {
        ...baseStyle,
        bottom: '0px'
      };
    }
    return {
      ...baseStyle,
      bottom: '-50px'
    };
  }

  function openSettings() {
    setOpen(true);
    dispatch(setTypeModal('settings'));
    dispatch(changeModalVisible(true));
  }

  function handlerClose() {
    setOpen(false);
  }

  function getWidth() {
    const modal: IWidth = constants.modal;
    return modal[width];
  }

  function exit() {
  }
  const SettingsRef = React.forwardRef<React.Ref<React.ComponentType>>((props, ref) => {
    return <Settings {...props} ref={ref}/>;
  });

  return (
    <Box sx={getStyleToolbox()}>
      <Button
        onClick={() => {
          toolboxAction.apply({ dispatch, actionCreater: changeChatVisible });
        }}
        classes={
          {
            startIcon: 'marginZero'
          }
        }
        startIcon={<CreateSvgIcon attributes={iconChat.attributes} styles={{ color: 'white' }}
                                  content={iconChat.content}/>}></Button>
      <Button
        onClick={openSettings}
              classes={
                {
                  startIcon: 'marginZero'
                }
              }
              startIcon={<CreateSvgIcon styles={{ color: 'white' }} attributes={iconSettings.attributes}
                                        content={iconSettings.content}/>}></Button>
      <Button
        onClick={exit }
        classes={
        {
          startIcon: 'marginZero'
        }
      } startIcon={<CreateSvgIcon
        sizes={{
        viewBox: '0 0 86 44',
          width: '86px',
          height: '44px'
      }} attributes={iconExit.attributes}
                                  content={iconExit.content}/>}></Button>
      <Modal
        sx={{
          width: getWidth(),
          bottom: 'initial'
        }}
        classes={{
          root: 'modal_settings'
        }
        } open={open} onClose={handlerClose} children={<SettingsRef ref={refSettings}/>}></Modal>
    </Box>
  );
}

export { Toolbox };
