import React, { useEffect, useRef, useState } from 'react';
import '../../widgets/styles/index.scss';
import {app} from '../../app/model/constants/app';
import GlagolProduct from 'glagol-video';
import GlagolDev from '../../../glagol/index';
import * as process from 'process';
import { Box } from '@mui/material';
import { TopPanel } from '../../widgets/layers/TopPanel';
import { LocalStream } from '../../widgets/layers/Localstream';
import { Toolbox } from '../../widgets/layers/Toolbox';
import { ChatsBox } from '../../widgets/layers/ChatsBox';


function getGlagol(mode: string|undefined){
  if (mode== "product") {
    console.log('production')
    return GlagolProduct;
  } else {
    console.log('developmetn')
    return GlagolDev;
  }
}
const Glagol=getGlagol(process.env.GLAGOL)


function RoomPage() {
  useEffect(() => {
    Glagol.setHandler('addTrack', (...args) => console.log(args));
    new Glagol({
      roomName: app.roomName,
      displayName: app.displayName,
      xmppUrl: 'https://xmpp.prosolen.net:5281/http-bind',
      webUrl: {
        iceCandidatePoolSize: 5,
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:vks.knodl.tech:80' },

          {
            urls: 'turn:vks.knodl.tech:80',
            username: 'nehy$.pth-3084659',
            credential: 'l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv'
          },

          {
            urls: 'turns:vks.knodl.tech:443',
            username: 'nehy$.pth-3084659',
            credential: 'l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv'
          },

          {
            urls: 'turns:vks.knodl.tech:443?transport=tcp',
            username: 'nehy$.pth-3084659',
            credential: 'l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv'
          },
        ]
      }
    });
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
</Box>
}

export { RoomPage };
