import React, { useRef, useState} from 'react';
import { Box, Button, Modal } from '@mui/material';
import {
  iconChat,
  iconExit,
  iconRecordStart,
  iconRecordStop,
  iconSettings,
  iconTittle
} from '../../shared/img/svg';
import { CreateSvgIcon } from '../createSvgIcon/CreateSvgIcon';
import { toolboxAction } from '../../functions/buttonActions/toolboxAction';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeChatVisible,
  changeIsRecording,
  changeModalVisible,
  changeTittle,
  setTypeModal
} from '../../app/store/configSlice';
import { Settings } from '../modal/settingsChildren/Settings';
import { constants } from '../../shared/config/constants';


interface IWidth {
  WIDTH_HEIGHT: string,
  WIDTH_MIDDLE: string,
  WIDTH_LOW: string
}

function Toolbox() {

  const refSettings = useRef<any>();
  const dispatch = useDispatch();
  const { openModal, type } = useSelector((state: any) => {
    return state.config.modal;
  });
  const { isRecording } = useSelector((state: any) => state.config.functions);
  const { tittle } = useSelector((state: any) => state.config.UI);
  const width: keyof IWidth = useSelector((state: any) => state.config.modal.width);
  /**
   * TO DO useState предусмотренно для скрывания
   */

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
    dispatch(changeModalVisible(true));
    dispatch(setTypeModal('settings'));
  }

  function handlerClose() {
    dispatch(changeModalVisible(false));
  }

  function getWidth() {
    const modal: IWidth = constants.modal;
    return modal[width];
  }

  function exit() {
  }

  function changingTittle() {
    dispatch(changeTittle(!tittle));
  }

  function getColorForTittleButton() {
    return tittle ? { color: 'green' } : { color: 'white' };
  }

  const SettingsRef = React.forwardRef<React.Ref<React.ComponentType>>((props, ref) => {
    return <Settings {...props} ref={ref}/>;
  });

  function getChildren() {
    switch (type) {
      case 'settings':
        return <SettingsRef ref={refSettings}/>;
      default:
        return <p>Empty dilog</p>;
    }
  }

  function recordClick() {
    dispatch(changeIsRecording(!isRecording));
  }

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
        startIcon={<CreateSvgIcon icon={iconChat} styles={{ color: 'white' }}
        />}></Button>
      <Button
        onClick={openSettings}
        classes={
          {
            startIcon: 'marginZero'
          }
        }
        startIcon={<CreateSvgIcon styles={{ color: 'white' }} icon={iconSettings}/>}></Button>
      <Button
        onClick={changingTittle}
        classes={
          {
            startIcon: 'marginZero'
          }
        }
        startIcon={<CreateSvgIcon sizes={{ viewBox: '15 15 30 30' }} styles={getColorForTittleButton()}
                                  icon={iconTittle}/>}></Button>

      <Button
        onClick={recordClick}
        classes={
          {
            startIcon: 'marginZero'
          }
        } startIcon={isRecording ? <CreateSvgIcon
        key="start"
        styles={{color: 'red'}}
        icon={iconRecordStop}/> : <CreateSvgIcon
        key="stop"
        styles={{color: 'white'}}
        icon={iconRecordStart}/>}></Button>

      <Button
        onClick={exit}
        classes={
          {
            startIcon: 'marginZero'
          }
        } startIcon={<CreateSvgIcon
        sizes={{
          viewBox: '0 0 86 44',
          width: '86px',
          height: '44px'
        }} icon={iconExit}/>}></Button>
      <Modal
        sx={{
          width: getWidth(),
          bottom: 'initial'
        }}
        classes={{
          root: 'modal_settings'
        }
        } open={openModal} onClose={handlerClose} children={getChildren()}></Modal>
    </Box>
  );
}

export { Toolbox };
