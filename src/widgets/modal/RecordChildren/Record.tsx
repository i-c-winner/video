import React from 'react';
import { Box, Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {changeIsRecording} from '../../../app/store/configSlice';

const Record = React.forwardRef<React.Ref<React.ComponentType>>((props: any, ref) => {
  const dispatch=useDispatch()
  const {isRecording} = useSelector((state: any)=>state.config.functions)
  function _startRecord() {
    dispatch(changeIsRecording(true))
  }
  function _stopRecord() {
    dispatch(changeIsRecording(false))
  }
function _onClick() {
  if (isRecording) {
    _stopRecord()
    {

    }
  }else {
      _startRecord()
    }
  }

  return (
   <Box>
     <Button onClick={_onClick}>stop</Button>
   </Box>
  );
});
export { Record };
