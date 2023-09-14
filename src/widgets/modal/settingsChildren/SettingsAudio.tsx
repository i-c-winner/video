import { ISettingsProps } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudioStream } from '../../../app/store/configSlice';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

function SettingsAudio(props: ISettingsProps) {
  const { t } = useTranslation();
  const { value, index } = props;
  const dispatch = useDispatch();
  const { audioStream } = useSelector((state: any) => state.config.conference);

  function changeButton(event: any) {
    dispatch(changeAudioStream(event.target.value === 'true'));
  }

  return value === index && (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{t('modal.disabled_audio')}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={audioStream}
        name="radio-buttons-group"
        onChange={changeButton}
      >
        <FormControlLabel value={false} control={<Radio/>} label="Октл"/>
        <FormControlLabel value={true} control={<Radio/>} label="Вкл"/>
      </RadioGroup>
    </FormControl>
  );
}

export { SettingsAudio };
