import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsRecording } from '../../../app/store/configSlice';


const Record = React.forwardRef<React.Ref<React.ComponentType>>((props: any, ref) => {

  const dispatch = useDispatch();
  const { isRecording } = useSelector((state: any) => state.config.functions);


  function _startRecord() {
    dispatch(changeIsRecording(true));
  }

  function _stopRecord() {
    dispatch(changeIsRecording(false));
  }

  function _onClick() {
    if (isRecording) {
      _stopRecord();
    } else {
      _startRecord();
    }
  }

  useEffect(() => {
    return function () {
    };
  });

  function getTextButton() {
    return isRecording ? 'stop' : 'start';
  }

  return (
    <Box>
      <Typography>{isRecording ? 'Остановить запсь' : 'Начать запись'} <Button
        onClick={_onClick}>{getTextButton()}</Button></Typography>
    </Box>
  );
});
export { Record };
