import { Box } from "@mui/material";
import "../styles/index.scss";
import { Screens } from '../Screens/Screens';
import { ChatBox } from '../chatBox/ChatBox';
import { useSelector } from 'react-redux';
import { IRootState } from '../../app/types';

function BigScreen() {
  const config = useSelector((state: IRootState) => state.config);
  const chatVisible: boolean = config.UI.chatBoxVisible;
  return (
    <Box sx={
      {
        position: 'relative',
        flexGrow: '1',
        display: 'flex',
        textAlign: 'center'
      }
    }>
      <ChatBox chatBoxVisible={chatVisible}/>
      <Screens/>
    </Box>
  );
}

export { BigScreen };
