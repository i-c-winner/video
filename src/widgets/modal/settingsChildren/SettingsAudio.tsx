import { ISettingsProps } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudioStream } from '../../../app/store/configSlice';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Switcher } from '../../switch/Switcher';

function SettingsAudio(props: ISettingsProps) {
  const { t } = useTranslation();
  const { value, index } = props;
  const dispatch = useDispatch();
  const { audioStream } = useSelector((state: any) => state.config.conference);

  const [state, setState]= useState(audioStream)

  function changeButton(event: any) {
    dispatch(changeAudioStream(event.target.value === 'true'));
    setState(!state)
  }

  return value === index && (
    <Button
      onClick={changeButton}
      disableRipple={true}
    sx={{
      ':hover': {
        backgroundColor: 'initial'
      },
      textTransform: 'initial'
    }}>
      <Switcher
        state={true}
        currentState={state}
        isToggle={true}
        text={t('modal.toggleAudio_enabled')}
        textIsToggle={t('modal.toggleAudio_disabled')}
      />
    </Button>

  );
}

export { SettingsAudio };
