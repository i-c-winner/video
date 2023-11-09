import { useRef, useState } from 'react';
import { glagol } from '../../shared/conference/glagol';
import { CreateRoomName } from '../../page/model/CreateRoomName';
import { CreateDisplayName } from '../../page/model/CreateDisplayName';
import { RoomPage } from '../../page/model/RoomPage';
import { Box } from '@mui/material';
import { styles } from '../styles';


function App() {
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

  return <Box
    sx={
      styles.main
    }>
    {state}
    {getChildren()}
    {state !== 'roomPage' && <button onClick={changeState}>click</button>}
  </Box>;
}

export { App };
