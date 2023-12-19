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
  function changingInput(event: (BaseSyntheticEvent| string),  type: string) {
    console.log(event)
    if (type==='roomName') {
     if (typeof event!=="string") glagol.params.roomName=event.target.value
    } else  if (type==='displayName'){
      if (typeof event!=="string")glagol.params.displayName=event.target.value
    } else if (type==='roomNameFromUrl') {
      if (typeof event==="string")  {
        if (refRoomName.current!==null) {
          refRoomName.current.value = event;
        }
        glagol.params.roomName=event
      }

    }
  }

  function changeState() {
    if (state === 'createRoomName') {
      const path= window.location.pathname
      if (path.split('/')[1]===''){
       if (refRoomName.current) history.replaceState(null, '', path+refRoomName.current.value)
      }
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
