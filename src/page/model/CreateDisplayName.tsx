import React, {useState} from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box } from '@mui/material';
import { styles } from '../styles/styles.';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudio, changeVideo } from '../../app/store/interfaceSlice';
import { iconCamera, iconMicrophone } from '../../shared/img/svg';
import { config } from '../../shared/config';
import { ButtonWithIcon } from '../../entity/model/UI/button/ButtonWithIcon';


const connection = async () => {
  return glagol.setLocalStream();
};
const CreateDisplayName = React.forwardRef<HTMLInputElement>((props, ref) => {

  const { data, error, isPending } = useAsync({ promiseFn: connection });
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const defaultButtonStyle={color: 'green'}
  const [styleButtonVideo, setStyleButtonVideo]=useState<typeof defaultButtonStyle>(defaultButtonStyle)
  const [styleButtonAudio, setStyleButtonAudio] =useState<typeof defaultButtonStyle>(defaultButtonStyle)

  const actions = {
    videoChange: (active: boolean) => {
      if (!active) {
        dispatch(changeVideo('disabled'));
        setStyleButtonVideo({color: 'red'})
      } else {
        dispatch(changeVideo(config.conference.quality.video));
        setStyleButtonVideo(defaultButtonStyle)
      }
    },
    audioChange: (active: boolean) => {
      if (!active) {
        dispatch(changeAudio('disabled'));
        setStyleButtonAudio({color: 'red'})
      } else {
        dispatch(changeAudio('enabled'));
        setStyleButtonAudio(defaultButtonStyle)
      }
    }
  };
  const buttonClasses = {
    startIcon: 'margin_zero'
  };
  const buttonSizes = {
    viewBox: '0 0 30 30'
  };
  if (isPending) {
    return <p>...Pending</p>;
  }
  if (data) {
    data.getTracks().forEach((track) => {
      try {
        glagol.peerConnection.addTrack(track);
      } catch (e) {

      }

    });
    glagol.peerConnectionAddHandlers();
    return <Box sx={styles.wrapper}>
      <input ref={ref}/>
      <ButtonWithIcon
        styles={styleButtonVideo}
        classes={buttonClasses}
        sizes={buttonSizes}
        variant="contained" startIcon={iconCamera}
        action={actions.videoChange}/>
      <ButtonWithIcon
        styles={styleButtonAudio}
        classes={buttonClasses}
        sizes={buttonSizes}
        variant="contained" startIcon={iconMicrophone}
        action={actions.audioChange}/>
    </Box>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateDisplayName };
