import { Box } from "@mui/material";
import "../styles/index.scss";
import { Screens } from '../Screens/Screens';
import { ChatBox } from '../chatBox/ChatBox';
import { useSelector } from 'react-redux';
import { IRootState } from '../../app/types';
import { useEffect, useRef, useState } from 'react';
import { changeToolboxIsVisible } from '../../app/store/configSlice';
import { useDispatch } from 'react-redux';

function BigScreen() {
  const dispatch = useDispatch();
  const refScreen = useRef<HTMLDivElement>(null);
  const config = useSelector((state: IRootState) => state.config);
  const chatVisible: boolean = config.UI.chatBoxVisible;

  useEffect(() => {
    if (refScreen.current !== null) {
      const screenY = refScreen.current.offsetHeight;
      refScreen.current.addEventListener('mousemove', (event: any) => {
        if ((screenY - event.clientY) < 70) {
          dispatch(changeToolboxIsVisible(true));
        } else {
          dispatch(changeToolboxIsVisible(false));
        }
      });
    }
  }, []);
  return (
    <Box
      ref={refScreen}
      sx={
        {
          position: 'relative',
          flexGrow: '1',
          display: 'flex',
          textAlign: 'center',
          width: '100%'
        }
      }>
      <ChatBox chatBoxVisible={chatVisible}/>
      <Screens/>
    </Box>
  );
}

export { BigScreen };
