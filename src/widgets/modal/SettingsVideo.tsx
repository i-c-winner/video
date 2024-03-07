import * as React from 'react';
import { BaseSyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import { glagol } from '../../entity/conference/glagol';
import { useTranslation } from 'react-i18next';
import { IVideoQty } from '../type';
import { Typography } from '@mui/material';
import { app } from "../../app/model/constants/app";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/store/interfaceSlice";


const videoQty: Readonly<IVideoQty> = {
  disabled: 'disabled',
  low: 'low',
  middle: 'middle',
  height: 'height'
};


//
// function toggleAudio(this: { dispatch: Dispatch }, event: BaseSyntheticEvent) {
//   const value: keyof IAudioQty = event.target.value;
//   glagol.applyConstraints({ type: 'audio', value });
//   this.dispatch(changeAudio(value));
// }

const SettingsVideo = React.forwardRef((props, ref) => {
  const {t} = useTranslation()
const dispatch=useDispatch()
  function changeQty(event: BaseSyntheticEvent) {
    const value: keyof IVideoQty = event.target.value;
    if (event.target.value === 'disabled') {
      app.glagolVC.glagolManager.switchOffCamera()
    } else {
      app.glagolVC.glagolManager.switchOnCamera()
      app.glagolVC.glagolManager.applyConstraints(event.target.value)
    }
    dispatch(openModal(false))
  }

  function getDefault() {
    const cameraIsWorking = app.glagolVC.glagolManager.cameraIsWorking
    if (cameraIsWorking) {
      return app.glagolVC.glagolManager.currentCameraQuantity
    }
    return 'disabled'
  }

  return (
    <Box sx={{
      width: '100%',
      paddingTop: '20vh',
      pointerEvents: 'none',
      textAlign: 'center',
      color: 'white'
    }}>

      <FormControl sx={{textAlign: 'center'}}>
        <FormLabel id="demo-radio-buttons-group-label">{t('modal.more.videoQty')}</FormLabel>
        <RadioGroup
          sx={{
            pointerEvents: 'initial'
          }}
          onChange={changeQty}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={getDefault()}
          name="radio-buttons-group"
        >
          <FormControlLabel value={videoQty.disabled} control={<Radio/>}
                            label={<Typography variant='myText'>{t('modal.settings.disabled')}</Typography>}/>
          <FormControlLabel value={videoQty.low} control={<Radio/>}
                            label={<Typography variant='myText'>{t('modal.settings.low')}</Typography>}/>
          <FormControlLabel value={videoQty.middle} control={<Radio/>}
                            label={<Typography variant='myText'>{t('modal.settings.middle')}</Typography>}/>
          <FormControlLabel value={videoQty.height} control={<Radio/>}
                            label={<Typography variant='myText'>{t('modal.settings.high')}</Typography>}/>
        </RadioGroup>
      </FormControl>
    </Box>
  );
});

export { SettingsVideo };
