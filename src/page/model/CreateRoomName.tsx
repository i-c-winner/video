import React from 'react';
import {useAsync} from 'react-async';
import {glagol} from '../../shared/conference/glagol';
import {Box} from '@mui/material';
import { styles } from '../styles/styles.';
const connection= async ()=>{
  return glagol.createConference()
}
const  CreateRoomName= React.forwardRef<any>((props, ref) => {
  const {data, error, isPending}= useAsync({promiseFn: connection})
  if (isPending) {
    return <p>...Pending</p>
  }
  if (data) {
    return <Box sx={styles.wrapper}>
      <input ref={ref} />
    </Box>
  }
  if (error) {
    return <p>error</p>
  }
  return <p>start</p>
})
export {CreateRoomName}
