import { glagol } from '../../entity/conference/glagol';
import React, { useEffect, useRef, useState } from 'react';
import '../../widgets/styles/index.scss';
import { Box } from '@mui/material';
import { LocalStream } from '../../widgets/layers/Localstream';
import { Toolbox } from '../../widgets/layers/Toolbox';
import { ChatsBox } from '../../widgets/layers/ChatsBox';
import { TopPanel } from '../../widgets/layers/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import { addRemoteTrack, addSharing, removeRemoteTrack, removeSharing } from '../../app/store/sourceSlice';
import { IStore, TStream } from '../../app/types';
import { addChat } from '../../app/store/chatsSlice';
import { addFile } from '../../app/store/filesSlice';
import { getRandomText } from '../../features/plugins/getRandomText';
import GlagolProduct from 'glagol-video';
import GlagolDev from '../../../../glagol/index';
import * as process from 'process';


function getGlagol(mode: string|undefined){
  if (mode== "product") {
    console.log('production')
    return GlagolProduct;
  } else {
    console.log('developmetn')
    return GlagolDev;
  }
}
console.log(process)

const Glagol=getGlagol(process.env.GLAGOL)




interface IMessage {
  text: string,
  id: string,
  author: string
}


function RoomPage() {
  useEffect(() => {
    Glagol.setHandler('addTrack', (...args) => console.log(args));
    new Glagol({
      roomName: glagol.params.roomName,
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

  return <p>Return Page</p>;
}

export { RoomPage };
