import { ISettingsProps } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudioStream } from '../../../app/store/configSlice';
import {
  Typography,
  Stack,
  FormGroup,
  Switch
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

function SettingsAudio(props: ISettingsProps) {
  const { t } = useTranslation();
  const { value, index } = props;
  const dispatch = useDispatch();
  const { audioStream } = useSelector((state: any) => state.config.conference);
  const styleText = {
    fontSize: '1em',
  };

  function onChange(event: any) {
    dispatch(changeAudioStream(!audioStream));
  }

  return value === index && (
    <FormGroup
      sx={{
        alignItems: 'center'
      }}
      onChange={onChange}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography sx={styleText}>{t('modal.audio.off')}</Typography>
        <Switch checked={audioStream}/>
        <Typography sx={styleText}>{t('modal.audio.on')}</Typography>
      </Stack>
    </FormGroup>
  );
}

export { SettingsAudio };
