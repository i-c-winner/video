import { useRef, useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from 'react';
import { glagol } from '../../entity/conference/glagol';
import { CreateRoomName } from '../../page/model/CreateRoomName';
import { CreateDisplayName } from '../../page/model/CreateDisplayName';
import { RoomPage } from '../../page/model/RoomPage';
import { Box, Button } from '@mui/material';
import { styles } from '../styles';
import { useTranslation } from 'react-i18next';


function App() {
  const { t } = useTranslation();
  const [ state, setState ] = useState<any>('createRoomName');
  const refRoomName = useRef<HTMLInputElement>(null);
  const refDisplayName = useRef<HTMLInputElement>(null);
  const [revirced, setReciverd]= useState(false)
  const refBox=useRef<any>()

  function getChildren() {
    switch (state) {
      case 'createUserName' :
        return <CreateDisplayName changeDisplayName={changingInput} ref={refDisplayName}/>;
      case 'createRoomName':
        return <CreateRoomName  changeRoomName={changingInput} ref={refRoomName}/>;
      case 'roomPage':
        return <RoomPage/>;
      default:
        return <p>unknown children</p>;
    }
  }

  function changingInput(event: (BaseSyntheticEvent | string), type: string) {
    setReciverd(true)
    if (type === 'roomName') {
      if (typeof event !== "string") glagol.params.roomName = event.target.value;
    } else if (type === 'displayName') {
      if (typeof event !== "string") glagol.params.displayName = event.target.value;
    }
  }

  function changeState() {
    setReciverd(false)
    if (state === 'createRoomName') {
      const path = window.location.pathname;
      if (refRoomName.current) history.replaceState(null, '', path.split('/')[0] + glagol.params.roomName);
      setState('createUserName');
    } else if (state === 'createUserName') {
      setState('roomPage');
    }
  }


  function getButtonText() {
    if (state === 'createRoomName') {
      return 'interface.buttons.createRoomName';
    }
    return 'interface.buttons.createDisplayName';
  }

  function getStyleButton() {
    if (window.screen.width > 720) {
      return {};
    } else {
      return {
        width: '80%',
        fontSize: '2em',
        height: '60px'
      };
    }
  }
useEffect(() =>{
    const roomName = window.location.pathname.split('/')[1];

        if (roomName !== '') {
          glagol.params.roomName=roomName
          setState('createUserName')
        }
}, [])

  return <Box
    ref={refBox}

    sx={
      styles.main
    }>
    {getChildren()}
    {state !== 'roomPage' && <Button
      disabled={!revirced}
      sx={getStyleButton()}
      variant="contained"
      onClick={changeState}>{t(getButtonText())}</Button>}
  </Box>

}

export { App };
