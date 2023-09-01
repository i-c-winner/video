import { CardContent, CardHeader, Card, Typography } from '@mui/material';
import { IChat } from '../../app/types';
import {glagol} from '../glagol/glagol';

function ChatCard(props: { chat: IChat }) {
  const styleBaseChat = {
    width: '80%',
    margin: '0 auto 10px',

  };
  const styleMyChat = {
    ...styleBaseChat,
    textAlign: 'right',
  };
  const styleOutherChat = {
    ...styleBaseChat,
    textAlign: 'left',
    backgroundColor: 'blue'
  };

  function getStyle() {
    if (props.chat.id===glagol.userNode) {
      return styleMyChat;
    } return styleOutherChat

  }
  const titleText= <Typography variant={'subtitle1'}> Время: {props.chat.time}  </Typography>

  return (
    <Card sx={getStyle()}>
      <CardHeader
      title={titleText}
      />
      <CardContent>
        <Typography variant='body1'>{props.chat.text}</Typography>
      </CardContent>
    </Card>
  );
}

export { ChatCard };
