import React, { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box, Input } from '@mui/material';
import { styles } from '../styles/styles.';
import { getInputStyles } from '../../features/styles/getInputStyles';
import { SyntheticEventData } from 'react-dom/test-utils';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

const connection = async () => {
  return glagol.createConference();
};
const CreateRoomName = React.forwardRef((props: { changeRoomName: (event: any, type: string) => void }, ref) => {
  const { data, error, isPending } = useAsync({ promiseFn: connection });
  const [ timeOuting, setTimeOuting ] = useState<TimeoutId | null>(null);

  function action(event: BaseSyntheticEvent) {
    props.changeRoomName(event, 'roomName');
  }

  if (isPending) {
    return <p>...Pending</p>;
  }
  if (data) {
    setTimeout(() => {
      const roomName = window.location.pathname.split('/')[1];
      props.changeRoomName(roomName, 'roomNameFromUrl');
    }, 0);

    return <Box sx={styles.wrapper}>
      <Input onChange={action} sx={getInputStyles()} inputRef={ref}/>
    </Box>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateRoomName };
