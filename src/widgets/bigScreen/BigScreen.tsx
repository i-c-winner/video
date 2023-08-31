import { Box } from "@mui/material";
import "../styles/index.scss";
import { Screens } from '../Screens/Screens';
import { ChatBox } from '../chatBox/ChatBox';
import { useSelector } from 'react-redux';

function BigScreen() {
  const config = useSelector((state: any) => state.config);
  const chatVisible: boolean = config.UI.chatBoxVisible;
  return (
    <Box sx={
      {
        position: 'relative',
        flexGrow: '1',
        display: 'flex'
      }
    }>
      <ChatBox chatBoxVisible={chatVisible}/>
      <Screens/>
    </Box>
  );
}

export { BigScreen };
