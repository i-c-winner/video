import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { glagol } from '../../entity/conference/glagol';

import { BaseSyntheticEvent, useState } from 'react';
import { IVideiQty, IAudioQty } from '../type';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { changeVideo, changeAudio } from '../../app/store/interfaceSlice';
import { Dispatch } from '@reduxjs/toolkit';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const videoQty: Readonly<IVideiQty> = {
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
  const { children, value, index, ...other } = props;
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
          width: '50%',
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

function changeQty(this: {dispatch: Dispatch},event: BaseSyntheticEvent) {
  const value: keyof IVideiQty = event.target.value;
  glagol.applyConstraints({ type: 'video', value });
  this.dispatch(changeVideo(value));

}

function toggleAudio(this: {dispatch: Dispatch}, event: BaseSyntheticEvent) {
  const value: keyof IAudioQty=event.target.value
  glagol.applyConstraints({ type: 'audio', value});
this.dispatch(changeAudio(value))
}

const Settings = React.forwardRef((props, ref) => {
  const [audio]= useState(useSelector((state: IStore)=>state.interface.conference.quality.audio))
  const [video]=useState(useSelector((state: IStore)=>state.interface.conference.quality.video))
  const dispatch = useDispatch();
  const [ value, setValue ] = React.useState(0);

  function getvideo() {
    return (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Качество видео</FormLabel>
        <RadioGroup
          sx={{
            pointerEvents: 'initial'
          }}
          onChange={changeQty.bind({dispatch})}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={video}
          name="radio-buttons-group"
        >
          <FormControlLabel value={videoQty.disabled} control={<Radio/>} label={videoQty.disabled}/>
          <FormControlLabel value={videoQty.low} control={<Radio/>} label={videoQty.low}/>
          <FormControlLabel value={videoQty.middle} control={<Radio/>} label={videoQty.middle}/>
          <FormControlLabel value={videoQty.height} control={<Radio/>} label={videoQty.height}/>
        </RadioGroup>
      </FormControl>
    );
  }

  function getAudio() {
    return (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Отключение аудио</FormLabel>
        <RadioGroup
          sx={{
            pointerEvents: 'initial'
          }}
          onChange={toggleAudio.bind({dispatch})}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={audio}
          name="radio-buttons-group"
        >
          <FormControlLabel value={audioQty.enabled} control={<Radio/>} label={audioQty.enabled}/>
          <FormControlLabel value={audioQty.disabled} control={<Radio/>} label={audioQty.disabled}/>
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
      pointerEvents: 'none'
    }}>
      <Box sx={{
        pointerEvents: 'initial',
        borderBottom: 1,
        borderColor: 'divider',
        margin: '0 auto',
        bgcolor: 'background.paper',
        padding: '10px 20px',
        width: '50%',
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Video" {...a11yProps(0)} />
          <Tab label="Audio" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {getvideo()}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {getAudio()}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
});

export { Settings };
