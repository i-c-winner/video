import { Box } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../app/types';
import { BigBox } from './BigBox';
import { SingleStreamMode } from './SingleStreamMode';
import { TileStreamMode } from './TileStreamMode';
import { SharingScreenMode } from './SharingScreenMode';


function LocalStreamsBox() {
  const { localComponentMode } = useSelector((state: IRootState) => state.config.UI);
  const [ children, setChildren ] = useState<ReactNode>(<SingleStreamMode/>);

  useEffect(() => {
    if (localComponentMode.tileStreamMode) {
      setChildren(<TileStreamMode/>);
    } else if (localComponentMode.singleStreamMode) {
      setChildren(<SingleStreamMode/>);
    } else if (localComponentMode.tileStreamMode) {
      setChildren(<SharingScreenMode/>);
    } else {
      setChildren(<p>Error</p>);
    }

  }, [ localComponentMode ]);


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
