import React from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box } from '@mui/material';
import { styles } from '../styles/styles.';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudio, changeVideo } from '../../app/store/interfaceSlice';
import { iconCamera, iconMicrophone } from '../../shared/img/svg';
import { config } from '../../shared/config';
import { CreateButtonWithIcon } from '../../entity/model/UI/button/CreateButtonWithIcon';


const connection = async () => {
  return glagol.setLocalStream();
};
const CreateDisplayName = React.forwardRef<HTMLInputElement>((props, ref) => {

  const { data, error, isPending } = useAsync({ promiseFn: connection });
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const videoButtonStyles = {
    wasToggled: {
      color: 'red',
    },
    wasNotToggled: {
      color: 'white'
    }
  };
  const actions = {
    videoChange: (wasToggled: boolean) => {
      if (!wasToggled) {
        dispatch(changeVideo('disabled'));
      } else {
        dispatch(changeVideo(config.conference.quality.video));
      }
    },
    audioChange: (wasToggled: boolean) => {
      if (!wasToggled) {
        dispatch(changeAudio('disabled'));
      } else {
        dispatch(changeAudio('enabled'));
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
      glagol.peerConnection.addTrack(track);
    });
    glagol.peerConnectionAddHandlers();
    return <Box sx={styles.wrapper}>
      <input ref={ref}/>
      <CreateButtonWithIcon
        buttonIsSwitcher={true}
        classes={buttonClasses}
        sizes={buttonSizes}
        variant="contained" startIcon={iconCamera} styles={videoButtonStyles}
        action={actions.videoChange}/>
      <CreateButtonWithIcon
        buttonIsSwitcher={true}
        classes={buttonClasses}
        sizes={buttonSizes}
        variant="contained" startIcon={iconMicrophone} styles={videoButtonStyles}
        action={actions.audioChange}/>
    </Box>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateDisplayName };
