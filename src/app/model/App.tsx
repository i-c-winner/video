import { useRef, useState, useEffect } from 'react';
import { glagol } from '../../entity/conference/glagol';
import { CreateRoomName } from '../../page/model/CreateRoomName';
import { CreateDisplayName } from '../../page/model/CreateDisplayName';
import { RoomPage } from '../../page/model/RoomPage';
import { Box, Button } from '@mui/material';
import { styles } from '../styles';
import { useTranslation } from 'react-i18next';


function App() {
  const {t}=useTranslation()
  const [ state, setState ] = useState<any>('createRoomName');
  const refRoomName = useRef<HTMLInputElement>(null);
  const refDisplayName = useRef<HTMLInputElement>(null);
  function getChildren() {

    switch (state) {
      case 'createUserName' :
        return <CreateDisplayName ref={refDisplayName}/>;
      case 'createRoomName':
        return <CreateRoomName ref={refRoomName}/>;
      case 'roomPage':
        return <RoomPage/>;
      default:
        return <p>unknown children</p>;
    }
  }

  function changeState() {
    if (refRoomName.current !== null) {
      if (validate(refRoomName.current.value)) glagol.params.roomName = refRoomName.current.value;
    }
    if (refDisplayName.current !== null) {
      if (validate(refDisplayName.current.value)) glagol.params.displayName = refDisplayName.current.value;
    }
    if (state === 'createRoomName') {
      setState('createUserName');
    } else if (state === 'createUserName') {
      setState('roomPage');
    }

    function validate(text: any): boolean {
      return text !== '';
    }
  }
  function creating(target: KeyboardEvent)  {
    if (target.key==='Enter') {
      changeState()
    }
  }
  useEffect (()=>{
    document.addEventListener('keydown', creating)
    return ()=>{
      document.removeEventListener('keydown', creating)
    }
  })
  function getButtonText(){
    if (state==='createRoomName') {
      return 'interface.buttons.createRoomName'
    } return 'interface.buttons.createDisplayName'
  }
function getStyleButton() {
    return {
      width: '80%',
      fontSize: '2em',
      height: '60px'
    }
}
  return <Box
    sx={
      styles.main
    }>
    {getChildren()}
    {state !== 'roomPage' && <Button
      sx={getStyleButton()}
      variant="contained"
      onClick={changeState}>{t(getButtonText())}</Button>}
  </Box>;
}

export { App };
