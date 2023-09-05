import { Tabs, Box, Tab } from '@mui/material';
import { SettingsVideo } from './SettingsVideo';
import { SettingsAudio } from './SettingsAudio';
import { SettingsUser } from './SettingsUser';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function allProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Settings = React.forwardRef<React.Ref<React.ComponentType>>((props: any, ref) => {
  const [ value, setValue ] = useState<number>(0);
  const { t } = useTranslation();

  function handlerChange(event: React.SyntheticEvent, newValue: number) {
    setValue(+newValue);
  }
  return (
    <Box>
      <Box  sx={{
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '25px'
      }}>
        <Tabs
          value={+value} onChange={handlerChange} aria-label="basic tabs example">
          <Tab label={t('buttons.labels.settings_video')} tabIndex={0} onFocus={props.onFocus} {...allProps(0)}></Tab>
          <Tab label={t('buttons.labels.settings_audio')} tabIndex={1} onFocus={props.onFocus}  {...allProps(1)}></Tab>
          <Tab label={t('buttons.labels.settings_user')} tabIndex={2} onFocus={props.onFocus}  {...allProps(2)}></Tab>
        </Tabs>
      </Box>
      <Box>
        <SettingsVideo value={value} index={Number(0)}/>
        <SettingsAudio value={value} index={Number(1)}/>
        <SettingsUser value={value} index={Number(2)}/>
      </Box>
    </Box>
  );
});

export { Settings };
