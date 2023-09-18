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
import React, { ChangeEvent, useState } from 'react';
import { IRootState } from '../../../app/types';

function SettingsAudio(props: ISettingsProps) {
  const { t } = useTranslation();
  const { value, index } = props;
  const dispatch = useDispatch();
  const { audioStream } = useSelector((state: IRootState) => state.config.conference);
  const styleText = {
    fontSize: '1em',
  };

  function onChange() {
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
