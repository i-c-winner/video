import { CardContent, CardHeader, Card, Typography, Box } from '@mui/material';
import { IChat } from '../../app/types';
import { glagol } from '../glagol/glagol';

function ChatCard(props: { chat: IChat }) {
  const styleBaseChat = {
    width: '80%',
    margin: '0 auto 20px',
    backgroundColor: 'rgba(25,25,25,.2)'
  };
  const styleMyChat = {
    ...styleBaseChat,
    textAlign: 'left',
    boxShadow: '0 0 5px red'
  };
  const styleOutherChat = {
    ...styleBaseChat,
    textAlign: 'right',
    boxShadow: '0 0 5px green'
  };

  function getStyle() {
    if (props.chat.id === glagol.userNode) {
      return styleMyChat;
    }
    return styleOutherChat;

  }

  const titleText =<Box>
    <Typography variant={'subtitle1'}> Время: {props.chat.time}  </Typography>
    <Typography variant={'subtitle1'}> Автор: {props.chat.author}  </Typography>
  </Box>

  return (
    <Card sx={getStyle()}>
      <CardHeader
        title={titleText}
      />
      <CardContent>
        <Typography variant="body1">{props.chat.text}</Typography>
      </CardContent>
    </Card>
  );
}

export { ChatCard };
