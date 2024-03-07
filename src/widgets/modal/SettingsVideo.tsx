import * as React from 'react';
import { BaseSyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import { glagol } from '../../entity/conference/glagol';
import { useTranslation } from 'react-i18next';
import { IAudioQty, IVideoQty } from '../type';
import { Dispatch } from '@reduxjs/toolkit';
import { Typography } from '@mui/material';
import { app } from "../../app/model/constants/app";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/store/interfaceSlice";

const width = '600px';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const videoQty: Readonly<IVideoQty> = {
  disabled: 'disabled',
  low: 'low',
  middle: 'middle',
  height: 'height'
};
const audioQty: Readonly<IAudioQty> = {
  disabled: 'disabled',
  enabled: 'enabled'
};

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{
          p: 3,
          bgcolor: 'background.paper',
          width,
          margin: '0 auto',
          height: '25vh',
          paddingTop: '15px',
          boxSizing: 'border-box'
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const SettingsVideo = React.forwardRef((props, ref) => {
  const {t} = useTranslation()
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch()

  function changeQty(this: { dispatch: Dispatch }, event: BaseSyntheticEvent) {
    const value: keyof IVideoQty = event.target.value;
    if (value === 'disabled') {
      app.glagolVC.glagolManager.switchOffCamera()
    } else {
      app.glagolVC.glagolManager.switchOnCamera()
      app.glagolVC.glagolManager.applyConstraints(value)
    }
    dispatch(openModal(false))
  }

function toggleAudio( event: BaseSyntheticEvent) {
  const value: keyof IAudioQty = event.target.value;
  if (value) {
    app.glagolVC.glagolManager.switchOffMic()
  } else {
    app.glagolVC.glagolManager.switchOnMic()
  }
  dispatch(openModal(false));
}
  function getvideo() {
    function getDefault() {
      const cameraIsWorking = app.glagolVC.glagolManager.cameraIsWorking
      if (!cameraIsWorking) {
        return 'disabled'
      }
      return app.glagolVC.glagolManager.currentCameraQuantity
    }

    return (
      <FormControl sx={{textAlign: 'center'}}>
        <FormLabel id="demo-radio-buttons-group-label">{t('modal.more.videoQty')}</FormLabel>
        <RadioGroup
          sx={{
            pointerEvents: 'initial'
          }}
          onChange={changeQty}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={getDefault}
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
    );
  }

  function getAudio() {
    function getDefault() {
      const microphoneIsWorking = app.glagolVC.glagolManager.microphoneIsWorking
      if (!microphoneIsWorking) {
        return 'disabled'
      }
      return 'enabled'
    }

    return (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{t('modal.more.mute')}</FormLabel>
        <RadioGroup
          sx={{
            pointerEvents: 'initial'
          }}
          onChange={toggleAudio}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={getDefault()}
          name="radio-buttons-group"
        >
          <FormControlLabel value={audioQty.enabled} control={<Radio/>}
                            label={<Typography variant='myText'>{t('modal.settings.enabled')}</Typography>}/>
          <FormControlLabel value={audioQty.disabled} control={<Radio/>}
                            label={<Typography variant='myText'>{t('modal.settings.disabled')}</Typography>}/>
        </RadioGroup>
      </FormControl>
    );
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
      width: '100%',
      paddingTop: '20vh',
      pointerEvents: 'none',
      textAlign: 'center',
      color: 'white'
    }}>
      <Box sx={{
        pointerEvents: 'initial',
        borderBottom: 1,
        borderColor: 'divider',
        margin: '0 auto',
        bgcolor: 'background.paper',
        padding: '10px 20px',
        width,
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t('modal.settings.video')} {...a11yProps(0)} />
          <Tab label={t('modal.settings.audio')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {getvideo()}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {getAudio()}
      </CustomTabPanel>
    </Box>
  );
});

export { SettingsVideo };
