import React from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box } from '@mui/material';
import { styles } from '../styles/styles.';
import {useTranslation} from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {changeAudio, changeVideo} from '../../app/store/interfaceSlice';
import {iconCamera} from '../../shared/img/svg';
import {config} from '../../shared/config';
import { CreateButtonWithIcon } from '../../entity/model/UI/button/CreateButtonWithIcon';

const connection = async () => {
  return glagol.setLocalStream();
};
const CreateDisplayName = React.forwardRef<HTMLInputElement>((props, ref) => {
  const { data, error, isPending } = useAsync({ promiseFn: connection });
  const dispatch= useDispatch()
  const {t, i18n}=useTranslation()
  function toggleQuality(...args: any[]) {
    if (args[0].type==='video') {
      dispatch(changeVideo(args[0].value))
    }
  }
  const videoButtonStyles={
    wasToggled: {
      color: 'red'
    },
    wasNotToggled: {
      color: 'green'
    }
  }

  if (isPending) {
    return <p>...Pending</p>;
  }
  if (data) {
    data.getTracks().forEach((track) => {
      glagol.peerConnection.addTrack(track)
    });
    glagol.peerConnectionAddHandlers();
    return <Box sx={styles.wrapper}>
      <input ref={ref}/>
      <CreateButtonWithIcon startIcon={iconCamera} styles={videoButtonStyles} action={toggleQuality}/>
    </Box>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateDisplayName };
