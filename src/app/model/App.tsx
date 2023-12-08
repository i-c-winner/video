import { useRef, useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from 'react';
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
        return <CreateDisplayName changeDisplayName = {changingInput} ref={refDisplayName}/>;
      case 'createRoomName':
        return <CreateRoomName changeRoomName={changingInput} ref={refRoomName}/>;
      case 'roomPage':
        return <RoomPage/>;
      default:
        return <p>unknown children</p>;
    }
  }
  function changingInput(event: BaseSyntheticEvent,  type: string) {
    console.log(event)
    if (type==='roomName') {
      glagol.params.roomName=event.target.value
    } else {
      glagol.params.displayName=event.target.value
    }
  }

  function changeState() {
    if (state === 'createRoomName') {
      setState('createUserName');
    } else if (state === 'createUserName') {
      setState('roomPage');
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
    if (window.screen.width>720) {
      return {}
    } else {
      return {
        width: '80%',
        fontSize: '2em',
        height: '60px'
      }
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
