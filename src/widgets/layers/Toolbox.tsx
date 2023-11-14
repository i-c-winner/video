import { Box, Button } from '@mui/material';
import { styles } from '../styles/styles';
import { sharing } from '../../entity/sharing';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { useDispatch } from 'react-redux';
import { changeChatsBox } from '../../app/store/interfaceSlice';
import { iconChat, iconSharing } from '../../shared/img/svg';
import { CreateSvgIcon } from '../../features/CreaeteSvgIcon';
import { addSharing, removeSharing } from '../../app/store/sourceSlice';


function Toolbox() {
  const dispatch = useDispatch();
  const { toolboxVisible, chatsBoxVisible } = useSelector((state: IStore) => state.interface);

  function sharingStart() {
    sharing.start().then((stream)=> {
      dispatch(addSharing({
        type: 'dashboard',
        id: stream.id
      }))
    })
  }

  function sharingStop() {
    // dispatch(removeSharing())
    sharing.stop();
  }

  function openChatsBox() {
    dispatch(changeChatsBox(!chatsBoxVisible));
  }

  return <Box sx={styles.toolboxLayer}>
    {toolboxVisible&&<Box sx={styles.toolboxLayer.toolbox}>
        <Button
          startIcon={<CreateSvgIcon icon={iconChat}/>}
          classes={{
            startIcon: 'margin_zero'
          }
          }
          variant="contained" onClick={openChatsBox}/>
        <Button
          variant="contained" onClick={sharingStart}
          classes={{
            startIcon: 'margin_zero'
          }}
          startIcon={<CreateSvgIcon
            sizes={{
              viewBox: '0 0 30 30'
            }}
            icon={iconSharing}/>}
        />
        <Button variant="contained" onClick={sharingStop}>stop</Button>
      </Box>
    }
    </Box>;
}

export { Toolbox };
