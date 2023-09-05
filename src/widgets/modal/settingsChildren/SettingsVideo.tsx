import { ISettingsProps } from '../../types';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeModalVisible, changeQuantityVideo } from '../../../app/store/configSlice';

const qualityVideo = {
  HEIGHT: "Высокое",
  MIDDLE: "Среднее",
  LOW: "Низкое"
};

function SettingsVideo(props: ISettingsProps) {
  const dispatch = useDispatch();
  const { videoQuantity } = useSelector((state: any) => state.config.conference);

  function changeButton(event: any) {
    dispatch(changeModalVisible(false));
    dispatch(changeQuantityVideo(event.target.value));
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
        defaultValue={videoQuantity}
        name="radio-buttons-group"
        onChange={changeButton}
      >
        <FormControlLabel value={'VIDEO_HEIGHT'} control={<Radio/>} label={qualityVideo.HEIGHT}/>
        <FormControlLabel value={'VIDEO_MIDDLE'} control={<Radio/>} label={qualityVideo.MIDDLE}/>
        <FormControlLabel value={'VIDEO_LOW'} control={<Radio/>} label={qualityVideo.LOW}/>
        <FormControlLabel value="disabled" control={<Radio/>} label="disable video"/>
      </RadioGroup>
    </FormControl>
  );
}

export { SettingsVideo };
