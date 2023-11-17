import React from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box } from '@mui/material';
import { styles } from '../styles/styles.';
import {useTranslation} from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {changeAudio, changeVideo} from '../../app/store/interfaceSlice';
import { IStore } from '../../app/types';
import {config} from '../../shared/config';

const connection = async () => {
  return glagol.setLocalStream();
};
const CreateDisplayName = React.forwardRef<HTMLInputElement>((props, ref) => {
  const { data, error, isPending } = useAsync({ promiseFn: connection });
  const {quality}=config.conference
  const dispatch= useDispatch()
  const {t, i18n}=useTranslation()
  function toggleVideo() {
    if (quality.video!=='disabled') {
      dispatch(changeVideo('disabled'))
    }
  }
  function toggleAudio(){

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
      <button onClick={toggleVideo}>Video</button>
      <button onClick={toggleAudio}>Audio</button>
    </Box>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateDisplayName };
