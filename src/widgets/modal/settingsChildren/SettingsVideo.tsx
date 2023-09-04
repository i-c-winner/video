import { ISettingsProps } from '../../types';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const qualityVideo = {
  HEIGHT: "Высокое",
  MIDDLE: "Среднее",
  LOW: "Низкое"
};

function SettingsVideo(props: ISettingsProps) {
  function changeButton(event: any) {
    switch (event.target.value) {
      case qualityVideo.HEIGHT:

        break
      case qualityVideo.MIDDLE:

        break
      case qualityVideo.LOW:

        break
      case "disabledVideo":
    }
  }

  const { value, index } = props;
  return value === index && (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Качество видео</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        /**
        *DO TO Необходимо определить начальное качество видео в
        зависимости от настроек
        */
        defaultValue={qualityVideo.MIDDLE}
        name="radio-buttons-group"
        onChange={changeButton}
      >
        <FormControlLabel value={qualityVideo.HEIGHT} control={<Radio/>} label={qualityVideo.HEIGHT}/>
        <FormControlLabel value={qualityVideo.MIDDLE} control={<Radio/>} label={qualityVideo.MIDDLE}/>
        <FormControlLabel value={qualityVideo.LOW} control={<Radio/>} label={qualityVideo.LOW}/>
        <FormControlLabel value="disabledVideo" control={<Radio/>} label="disable video"/>
      </RadioGroup>
    </FormControl>
  );
}

export { SettingsVideo };
