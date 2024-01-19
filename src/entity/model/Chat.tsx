import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import '../styles/index.scss';
import { TChat } from '../../app/types';
import React from 'react';

function Chat(props: { chat: TChat }) {
  const flexBox = {
    display: 'flex',
    justifyContent: 'space-between'
  };
  const card = <React.Fragment>
    <CardHeader
      sx={{
        padding: '5px',

      }}
      title={<Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography>{props.chat.author}</Typography>
        <Typography>Time</Typography>
      </Box>}
    >
    </CardHeader>
    <CardContent
      sx={{
        textAlign: 'left',
        padding: '6px'
      }}
    >
      {props.chat.text}</CardContent>
  </React.Fragment>;
  return (
    <Box
      sx={{
        ...flexBox,
        marginBottom: '10px'
      }

      }
    >
      <Box
        sx={{
          borderRadius: '50%',
          minWidth: '50px',
          height: '50px',
          background: 'grey',
          marginRight: '10px'
        }}
      ></Box>
      <Card sx={{
        flexGrow: '1',
        color: 'white',
        bgcolor: '#2a2f42',
        padding: '5px 10px'
      }} variant="outlined">{card}</Card>
    </Box>


  );
}

export { Chat };
