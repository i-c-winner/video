import { Box, Button } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { useDispatch } from 'react-redux';
import { changeChatsBox } from '../../app/store/interfaceSlice';
import { iconChat } from '../../shared/img/svg';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';


function Toolbox() {
  const dispatch = useDispatch();
  const { toolboxVisible, chatsBoxVisible } = useSelector((state: IStore) => state.interface);

  function sharingStart() {
    sharing.start();
  }

  function sharingStop() {
    sharing.stop();
  }

  function openChatsBox() {
    dispatch(changeChatsBox(!chatsBoxVisible));
  }

  return <Box sx={styles.toolboxLayer}>
    <Box sx={styles.toolboxLayer.toolbox}>
      <Button
        startIcon={<CreateSvgIcon icon={iconChat}/>}
        classes={{
          startIcon: 'margin_zero'
        }
        }
        variant="contained" onClick={openChatsBox}/>
      <Button variant="contained" onClick={sharingStart}>sharing</Button>
      <Button variant="contained" onClick={sharingStop}>stop</Button>
    </Box></Box>;
}

export { Toolbox };
