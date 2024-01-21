import React, { SyntheticEvent, useState } from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box, Input } from '@mui/material';
import {styles} from '../styles/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudio, changeVideo } from '../../app/store/interfaceSlice';
import { iconCamera, iconMicrophone } from '../../shared/img/svg';
import { config } from '../../shared/config';
import { ButtonWithIcon } from '../../entity/model/UI/button/ButtonWithIcon';
import { getInputStyles } from '../../features/styles/getInputStyles';


const connection = async () => {
  return glagol.setLocalStream();
};
const CreateDisplayName = React.forwardRef((props: {
  changeDisplayName: (event: any, type: string) => void
}, ref) => {

  const { data, error, isPending } = useAsync({ promiseFn: connection });
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const defaultButtonStyle = { color: 'green' };
  const [ styleButtonVideo, setStyleButtonVideo ] = useState<typeof defaultButtonStyle>(defaultButtonStyle);
  const [ styleButtonAudio, setStyleButtonAudio ] = useState<typeof defaultButtonStyle>(defaultButtonStyle);

  const actions = {
    videoChange: (active: boolean) => {
      if (!active) {
        dispatch(changeVideo('disabled'));
        setStyleButtonVideo({ color: 'red' });
      } else {
        dispatch(changeVideo(config.conference.quality.video));
        setStyleButtonVideo(defaultButtonStyle);
      }
    },
    audioChange: (active: boolean) => {
      if (!active) {
        dispatch(changeAudio('disabled'));
        setStyleButtonAudio({ color: 'red' });
      } else {
        dispatch(changeAudio('enabled'));
        setStyleButtonAudio(defaultButtonStyle);
      }
    }
  };
  const buttonClasses = {
    startIcon: 'margin_zero'
  };

  function action(event: SyntheticEvent) {
    props.changeDisplayName(event, 'displayName');
  }

  function getButtonSizes() {
    if (window.screen.width > 720) {
      return {
        viewBox: '0 0 30 30'
      };
    } else {
      return {
        viewBox: '0 0 25 25',
        width: '100px',
        height: '100px'
      };
    }
  }

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
      <Input placeholder="input yourName" onChange={action} sx={getInputStyles()} ref={ref}/>
      <Box sx={{
        display: 'flex', justifyContent: 'center',
        marginTop: '10px'
      }}>
        <ButtonWithIcon
          styles={styleButtonVideo}
          classes={buttonClasses}
          sizes={getButtonSizes()}
          variant="outlined" startIcon={iconCamera}
          action={actions.videoChange}/>
        <ButtonWithIcon
          styles={styleButtonAudio}
          classes={buttonClasses}
          sizes={getButtonSizes()}
          variant="outlined" startIcon={iconMicrophone}
          action={actions.audioChange}/>
      </Box>

    </Box>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateDisplayName };
