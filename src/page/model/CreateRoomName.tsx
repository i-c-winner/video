import React, { BaseSyntheticEvent } from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box, Input } from '@mui/material';
import { styles } from '../styles/styles.';
import { getInputStyles } from '../../features/styles/getInputStyles';

const connection = async () => {
  return glagol.createConference();
};
const CreateRoomName = React.forwardRef((props: {
  changeRoomName: (event: any, type: string) => void,
  wasLoaded: ()=>void
}, ref) => {
  const { data, error, isPending } = useAsync({ promiseFn: connection });

  function action(event: BaseSyntheticEvent) {
    props.changeRoomName(event, 'roomName');
  }

  if (isPending) {
    return <p>...Pending</p>;
  }
  if (data) {
    props.wasLoaded()
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
