import { ISettingsProps } from '../../types';
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeModalVisible, changeQuantityVideo } from '../../../app/store/configSlice';
import { Switcher } from '../../switch/Switcher';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const qualityVideo = {
  HEIGHT: "height",
  MIDDLE: "middle",
  LOW: "low",
  DISABLED: "disabled"
};

function SettingsVideo(props: ISettingsProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ currenValue, setCurrentValue ] = useState(qualityVideo.MIDDLE);
  const videoQuantity: 'HEIGHT' | 'MIDDLE' | 'LOW' | 'DISABLED' = useSelector((state: any) => state.config.conference.videoQuantity);

  function changeButton(event: any) {
    // const value: = event.target.value
    dispatch(changeQuantityVideo(event.target.value));
    // setCurrentValue(qualityVideo[value])
  }

  useEffect(() => {
    console.log('START');
  }, []);
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
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            paddingTop: '10px'
          }}
        >
          <Switcher
            currentState={qualityVideo[videoQuantity]}
            state={qualityVideo.HEIGHT}
            text={t('modal.quality_height')}
          />
          <FormControlLabel
            sx={{
              position: 'absolute',
              left: '0',
              opacity: '0'
            }}
            value={'HEIGHT'} control={<Radio/>} label={qualityVideo.HEIGHT}/>
        </Box>
        <Box
          sx={{
            display: 'flex',
            position: 'relative'
          }}
        >
          <Switcher
            currentState={qualityVideo[videoQuantity]}
            state={qualityVideo.MIDDLE}
            text={t('modal.quality_middle')}
          />

          <FormControlLabel
            sx={{
              position: 'absolute',
              left: '0',
              opacity: '0'
            }}
            value={'MIDDLE'} control={<Radio/>} label={qualityVideo.MIDDLE}/>
        </Box>

        <Box
          sx={{
            display: 'flex',
            position: 'relative'
          }}
        >
          <Switcher
            currentState={qualityVideo[videoQuantity]}
            state={qualityVideo.LOW}
            text={t('modal.quality_low')}
          />
          <FormControlLabel
            sx={{
              position: 'absolute',
              left: '0',
              opacity: '0'
            }}
            value={'LOW'} control={<Radio/>} label={qualityVideo.LOW}/>
        </Box>
        <Box
          sx={{
            display: 'flex',
            position: 'relative'
          }}
        >
          <Switcher
            currentState={qualityVideo[videoQuantity]}
            state={qualityVideo.DISABLED}
            text={t('modal.quality_disabled')}
          />
          <FormControlLabel
            sx={{
              position: 'absolute',
              left: '0',
              opacity: '0'
            }}
            value={'DISABLED'} control={<Radio/>} label={'qualityVideo.DISABLED'}/>
        </Box>
      </RadioGroup>
    </FormControl>
  );
}

export { SettingsVideo };
