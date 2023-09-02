import { Tabs, Box, Tab } from '@mui/material';
import { SettingsVideo } from './SettingsVideo';
import { SettingsAudio } from './SettingsAudio';
import { SettingsUser } from './SettingsUser';
import React, { useState } from 'react';

function allProps(index: number) {

  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Settings= React.forwardRef<React.Ref<React.ComponentType>>((props: any, ref) =>{
  const [ value, setValue ] = useState<number>(0);

  function handlerChange(event: React.SyntheticEvent, newValue: number) {
    setValue(+newValue);
  }
console.log(props.onFocus, 'Props')
  return (
    <Box>
      <Box>
        <Tabs value={+value} onChange={handlerChange} aria-label="basic tabs example">
          <Tab label="labels.settings_video" tabIndex={0} onFocus={props.onFocus} {...allProps(0)}></Tab>
          <Tab label="labels.settings_audio" tabIndex={1} onFocus={props.onFocus}  {...allProps(1)}></Tab>
          <Tab label="labels.settings_user" tabIndex={2} onFocus={props.onFocus}  {...allProps(2)}></Tab>
        </Tabs>
      </Box>
      <Box>
        <SettingsVideo value={value} index={Number(0)}/>
        <SettingsAudio value={value} index={Number(1)}/>
        <SettingsUser value={value} index={Number(2)}/>
      </Box>
    </Box>
  );
})

export { Settings };
