import { CardContent, CardHeader, Card, Typography } from '@mui/material';

function ChatCard() {
  const styleBaseChat={
    width: '80%',
    margin: '0 auto 10px',

  }
const styleMyChat={
...styleBaseChat,
  textAlign: 'right',
  backgroundColor: 'blue'

}
const styleOutherChat={
    ...styleBaseChat,
textAlign: 'left'
}
function getStyle() {
    return styleOutherChat
}
  return (
    <Card sx={getStyle()}>
      <CardHeader>
<Typography>Time</Typography>
      </CardHeader>
      <CardContent>
<Typography>Text</Typography>
      </CardContent>
    </Card>
  );
}

export { ChatCard };
