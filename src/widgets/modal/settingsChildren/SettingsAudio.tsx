import { ISettingsProps } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { changeAudioStream } from '../../../app/store/configSlice';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

function SettingsAudio(props: ISettingsProps) {
  const { value, index } = props;
  const dispatch = useDispatch();
  const { audioStream } = useSelector((state: any) => state.config.conference);

  function changeButton(event: any) {
    dispatch(changeAudioStream(event.target.value));
  }

  return value === index && (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Отключить аудио</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        /**
        *DO TO Необходимо определить начальное качество видео в
        зависимости от настроек
        */
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
