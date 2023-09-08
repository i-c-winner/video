import React, { useRef, useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { iconChat, iconSettings, iconExit, iconTittle, iconRecordStop, iconRecordStart } from '../../shared/img/svg';
import { CreateSvgIcon } from '../createSvgIcon/CreateSvgIcon';
import { toolboxAction } from '../../functions/buttonActions/toolboxAction';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatVisible, changeModalVisible, setTypeModal, changeTittle } from '../../app/store/configSlice';
import { Settings } from '../modal/settingsChildren/Settings';
import { constants } from '../../shared/config/constants';
import {Record} from '../modal/RecordChildren/Record';

function Toolbox() {
  interface IWidth {
    WIDTH_HEIGHT: string,
    WIDTH_MIDDLE: string,
    WIDTH_LOW: string
  }

  const refSettings = useRef<any>();
  const refRecord = useRef<any>()
  const dispatch = useDispatch();
  const { openModal, settings, type } = useSelector((state: any) => {
    return state.config.modal;
  });
  const {tittle}= useSelector((state: any)=>state.config.UI)
  const width: keyof IWidth = useSelector((state: any) => state.config.modal.width);

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
    dispatch(changeModalVisible(true))
    dispatch(setTypeModal('settings'));
  }

  function openRecordingDialog() {
    dispatch(changeModalVisible(true))
    dispatch(setTypeModal('record'));
  }

  function handlerClose() {
    dispatch(changeModalVisible(false))
  }

  function getWidth() {
    const modal: IWidth = constants.modal;
    return modal[width];
  }

  function exit() {
  }
  function changingTittle() {
    dispatch(changeTittle(!tittle))
  }
  function getColorForTittleButton() {
    return tittle? { color: 'green' }: {color: 'white'}
  }

  const SettingsRef = React.forwardRef<React.Ref<React.ComponentType>>((props, ref) => {
    return <Settings {...props} ref={ref}/>;
  });
  const RecordRef=React.forwardRef<React.Ref<React.ComponentType>>((props, ref)=>{
    return <Record {...props} ref={ref}/>
  })
function getChildren() {
    switch (type) {
      case 'settings':
        return <SettingsRef ref={refSettings}/>
      case 'record':
        return <RecordRef  ref={refRecord} />
      default:
        return <p>Empty dilog</p>
    }
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
        onClick={changingTittle}
        classes={
          {
            startIcon: 'marginZero'
          }
        }
        startIcon={<CreateSvgIcon sizes={{viewBox: '15 15 30 30'}} styles={getColorForTittleButton()} attributes={iconTittle.attributes}
                                  content={iconTittle.content}/>}></Button>
      <Button
        onClick={openRecordingDialog}
        classes={
          {
            startIcon: 'marginZero'
          }
        }
        startIcon={<CreateSvgIcon sizes={{viewBox: '0 0 25 25'}} styles={getColorForTittleButton()} attributes={iconRecordStart.attributes}
                                  content={iconRecordStart.content}/>}></Button>
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
        } open={openModal} onClose={handlerClose} children={getChildren()}></Modal>
    </Box>
  );
}

export { Toolbox };
