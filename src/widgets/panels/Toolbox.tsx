import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Modal, Tooltip } from '@mui/material';
import {
  iconChat,
  iconExit,
  iconRecordStart,
  iconRecordStop,
  iconSettings,
  iconTile,
  iconSharing
} from '../../shared/img/svg';
import { CreateSvgIcon } from '../createSvgIcon/CreateSvgIcon';
import { toolboxAction } from '../../functions/buttonActions/toolboxAction';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  changeChatVisible,
  changeIsRecording,
  changeModalVisible,
  changeTile,
  setTypeModal,
  changeLeftOut,
  changeSharingScreen
} from '../../app/store/configSlice';
import { Settings } from '../modal/settingsChildren/Settings';
import { constants } from '../../shared/config/constants';
import { Recording } from '../../functions/recording/recording';
import { IRootState } from '../../app/types';

let recording: null | Recording = null;

function Toolbox() {
  const { t } = useTranslation();
  const refSettings = useRef(null);
  const dispatch = useDispatch();
  const { openModal, type } = useSelector((state: IRootState) => {
    return state.config.modal;
  });
  const { isRecording } = useSelector((state: IRootState) => state.config.functions);
  const { tile, sharingScreen} = useSelector((state: IRootState) => state.config.UI);
  const width = useSelector((state: IRootState) => state.config.modal.width);
  const { toolboxIsVisible } = useSelector((state: IRootState) => state.config.UI);
  const refToolbox = useRef<HTMLDivElement>(null);

  const baseStyle = {
    backgroundColor: 'background.paper',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  };
  function openSettings() {
    dispatch(changeModalVisible(true));
    dispatch(setTypeModal('settings'));
  }

  function handlerClose() {
    dispatch(changeModalVisible(false));
  }

  function getWidth() {
    const modal = constants.modal;
    return modal[width];
  }

  function exit() {
    dispatch(changeLeftOut());
  }

  function changingTile() {
    dispatch(changeTile(!tile));
  }

  function getColorForTileButton() {
    return tile ? { color: 'green' } : { color: 'white' };
  }

  const SettingsRef = React.forwardRef<React.Ref<React.ComponentType>>((props, ref) => {
    return <Settings {...props} ref={ref}/>;
  });

  function getChildren() {
    switch (type) {
      case 'settings':
        return <SettingsRef ref={refSettings}/>;
      default:
        return <p>Empty dialog</p>;
    }
  }

  function recordClick() {
    dispatch(changeIsRecording(!isRecording));
  }

  function sharingScreenAction() {
    dispatch(changeSharingScreen(!sharingScreen))
  }

  useEffect(() => {
    if (refToolbox.current !== null) {
      refToolbox.current.classList.add('is-visible');
      refToolbox.current.classList.add('toolbox');
    }
  }, []);
  useEffect(() => {
      if (refToolbox.current !== null) {
        if (!toolboxIsVisible) {
          refToolbox.current.classList.add('is-visible');
        } else {
          refToolbox.current.classList.remove('is-visible');
        }
      }
    }
    , [ toolboxIsVisible ]);
  useEffect(() => {
    if (isRecording) {
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
      if (recording !== null) {
        recording.stop();
      }
    }
  }, [ isRecording ]);
  return (
    <Box
      sx={{
        zIndex: '10'
      }}
      ref={refToolbox}>
      <Tooltip title={t('buttons.labels.chat')}>
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
      </Tooltip>
      <Tooltip title={t('buttons.labels.settings')}>
        <Button
          onClick={openSettings}
          classes={
            {
              startIcon: 'marginZero'
            }
          }
          startIcon={<CreateSvgIcon styles={{ color: 'white' }} icon={iconSettings}/>}></Button>
      </Tooltip>
      <Tooltip title={t('buttons.labels.tile')}>
        <Button
          onClick={changingTile}
          classes={
            {
              startIcon: 'marginZero'
            }
          }
          startIcon={<CreateSvgIcon sizes={{ viewBox: '15 15 30 30' }} styles={getColorForTileButton()}
                                    icon={iconTile}/>}></Button>
      </Tooltip>
      <Tooltip title={t('buttons.labels.tile')}>
        <Button
          onClick={sharingScreenAction}
          classes={
            {
              startIcon: 'marginZero'
            }
          }
          startIcon={<CreateSvgIcon sizes={{ viewBox: '0 0 32 32' }} styles={getColorForTileButton()}
                                    icon={iconSharing}/>}></Button>
      </Tooltip>
      <Tooltip title={t('buttons.labels.record')}>
        <Button
          onClick={recordClick}
          classes={
            {
              startIcon: 'marginZero'
            }
          } startIcon={isRecording ? <CreateSvgIcon
          key="start"
          styles={{ color: 'red' }}
          icon={iconRecordStop}/> : <CreateSvgIcon
          key="stop"
          styles={{ color: 'white' }}
          icon={iconRecordStart}/>}></Button>
      </Tooltip>
      <Tooltip title={t('buttons.labels.exit')}>
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
      </Tooltip>

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
