import React, { ForwardedRef, useState, useEffect } from 'react';
import {RemoteStreamsBox} from './RemoteStreamsBox';
import { iconLogo, iconMenu } from '../../shared/img/svg';
import { Box } from '@mui/material';
import { styles } from '../styles/styles';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';
import { glagol } from '../../entity/conference/glagol';
import { config } from '../../shared/config';
import { getRandomText } from '../../features/plugins/getRandomText';
import { ButtonWithIcon } from '../../entity/model/UI/button/ButtonWithIcon';
import { changeTypeModal, openModal } from '../../app/store/interfaceSlice';

const LocalStream = React.forwardRef((props, ref: ForwardedRef<HTMLVideoElement>) => {
  const dispatch = useDispatch();
  const { chatsBoxVisible, tileMode, remoteBoxVisible } = useSelector((state: IStore) => state.interface);
  const { quality } = useSelector((state: IStore) => state.interface.conference);
  glagol.applyConstraints({ type: 'video', value: quality.video });
  glagol.applyConstraints({ type: 'audio', value: quality.audio });
  const sizes = {
    width: '100px',
    height: '100px',
    viewBox: '-4 0 40 40'
  };

  function openMenu() {
    dispatch(changeTypeModal('more'));
    dispatch(openModal(true));
  }

  function getMarginForMenuButton() {
    if (remoteBoxVisible) {
      return '300px';
    }
    return '50px';
  }

  return <Box sx={
    styles.localeStyleLayer
  }>
    <RemoteStreamsBox />
    {/*<CreateSvgIcon sizes={sizes} styles={styles.localeStyleLayer.logo} icon={iconLogo}></CreateSvgIcon>*/}
    <video className="video video_local" ref={ref} autoPlay={true}/>
    {/*<ButtonWithIcon startIcon={iconMenu} sizes={{ viewBox: '9 9 25 25' }}*/}
    {/*                wrapperStyles={{*/}
    {/*                  position: 'absolute',*/}
    {/*                  right: getMarginForMenuButton(),*/}
    {/*                  top: '50px',*/}
    {/*                  pointerEvents: 'initial',*/}
    {/*                }}*/}
    {/*                classes={{*/}
    {/*                  root: 'margin_zero button_more'*/}
    {/*                }}*/}
    {/*                styles={styles.localeStyleLayer.menu}*/}
    {/*                action={openMenu}*/}
    {/*                tooltipKey="menu"*/}
    {/*/>*/}
    {/*{remoteBoxVisible && !tileMode &&*/}
    {/*  <Box key={getRandomText(5)} sx={{ minWidth: config.boxes.remoteStreamBox.width }}/>}*/}
  </Box>;

});
export { LocalStream };
