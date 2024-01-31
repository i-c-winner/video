import React, { SyntheticEvent, useState } from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box, Input } from '@mui/material';
import { styles } from '../styles/styles';
import { useTranslation } from 'react-i18next';
import {IStore} from '../../app/types';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudio, changeVideo } from '../../app/store/interfaceSlice';
import { config } from '../../shared/config';
import { getInputStyles } from '../../features/styles/getInputStyles';
import { VideoCameraIcon, VideoCameraSlashIcon } from '@heroicons/react/24/outline';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import {MicOff} from '@mui/icons-material';

const connection = async () => {
return 'OK'
  // return navigator.mediaDevices.getUserMedia({
  //   video: true,
  //   audio: true
  // })
};
const CreateDisplayName = React.forwardRef((props: {
  changeDisplayName: (event: any, type: string) => void
}, ref) => {
const {audio, video} = useSelector((state: IStore)=>state.interface.conference.quality)
  const { data, error, isPending } = useAsync({ promiseFn: connection });
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const actions = {
    videoChange: () => {
      if (video!=='disabled') {
        dispatch(changeVideo('disabled'));
      } else {
        dispatch(changeVideo(config.conference.quality.video));
      }
    },
    audioChange: () => {
      if (audio!=='disabled') {
        dispatch(changeAudio('disabled'));
      } else {
        dispatch(changeAudio('enabled'));
      }
    }
  };
  function action(event: SyntheticEvent) {
    props.changeDisplayName(event, 'displayName');
  }


  if (isPending) {
    return <p>...Pending</p>;
  }
  if (data) {

    return <Box sx={styles.wrapper}>
      <Input placeholder="input yourName" onChange={action} sx={getInputStyles()} ref={ref}/>
      <Box sx={{
        display: 'flex', justifyContent: 'center',
        marginTop: '10px',
      }}>
        <ButtonWrapper action={actions.videoChange}>{video!=='disabled'?<VideoCameraIcon/>:<VideoCameraSlashIcon color='red'/>}
        </ButtonWrapper>
        <ButtonWrapper action={actions.audioChange}>{audio!=='disabled'?<MicrophoneIcon/>:<Box sx={{color: 'red'}}><MicOff /></Box>}
        </ButtonWrapper>
      </Box>

    </Box>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateDisplayName };
