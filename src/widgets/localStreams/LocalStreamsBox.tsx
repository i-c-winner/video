import { Box } from '@mui/material';
import React, { ReactNode, useState, useEffect } from 'react';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../app/types';
import { BigBox } from './BigBox';
import { SingleStreamMode } from './SingleStreamMode';
import { TileStreamMode } from './TileStreamMode';
import { SharingScreenMode } from './SharingScreenMode';
import { conference } from '../../functions/Conference';
import { changeLocalComponentMode } from '../../app/store/configSlice';


function LocalStreamsBox() {
  const { localComponentMode } = useSelector((state: IRootState) => state.config.UI);
  const [ children, setChildren ] = useState<ReactNode>(<SingleStreamMode/>);
  const [ typeSharingScreenUser, setTypeSharingScreenUser ] = useState<string>('');
  const dispatch = useDispatch();

  function renderSharingScreen(type: string) {
    console.log("RENDER SHARING")
    dispatch(changeLocalComponentMode({ type: 'sharingScreenMode', value: true }));
    setTypeSharingScreenUser(type);
  }

  useEffect(() => {
    if (localComponentMode.tileStreamMode) {
      setChildren(<TileStreamMode/>);
    } else if (localComponentMode.singleStreamMode) {
      setChildren(<SingleStreamMode/>);
    } else if (localComponentMode.sharingScreenMode) {
      setChildren(<SharingScreenMode />);
    } else {
      setChildren(<p>Error</p>);
    }

  }, [ localComponentMode ]);
  useEffect(() => {
    conference.XmppOn('renderSharingScreen', renderSharingScreen);
  },[]);

  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative',
    }}>
      <Header/>
      <BigBox>
        {children}
      </BigBox>
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
