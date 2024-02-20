import React, { useEffect, useRef, useState } from 'react';
import '../../widgets/styles/index.scss';

import * as process from 'process';
import { Box } from '@mui/material';
import { TopPanel } from '../../widgets/layers/TopPanel';
import { LocalStream } from '../../widgets/layers/Localstream';
import { Toolbox } from '../../widgets/layers/Toolbox';
import { ChatsBox } from '../../widgets/layers/ChatsBox';
import {app} from '../../app/model/constants/app';

function RoomPage() {
    console.log(app.glagolVC, 'APP')
    app.glagolVC.setHandler('addTrack', ()=>{console.log('addTrack')})
  function roomOn(...args: any[]) {
    console.log(args, 'roomOn');
  }

  useEffect(() => {

  });


  return <Box
    sx={{
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      bgcolor: 'background.paper',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px'
    }}
  >
    <Box sx={{
      flexGrow: '1',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between',
      paddingRight: '16px',
      boxSizing: 'border-box'
    }}>
      <TopPanel/>

      <Toolbox/>
    </Box>
    <ChatsBox/>
  </Box>;
}

export { RoomPage };
