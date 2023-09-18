import { Tabs, Box, Tab } from '@mui/material';
import { SettingsVideo } from './SettingsVideo';
import { SettingsAudio } from './SettingsAudio';
import { SettingsUser } from './SettingsUser';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {changeSelectedTab} from '../../../app/store/configSlice';

function allProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Settings = React.forwardRef<React.Ref<React.ComponentType>>((props, ref) => {
  const { t } = useTranslation();
  const {tabs, selectedTab}= useSelector((state: any)=> state.config.modal.settings)
 const dispatch=useDispatch()
  const [ value, setValue ] = useState<number>(selectedTab);
  function handlerChange(event: React.SyntheticEvent, newValue: number) {
    dispatch(changeSelectedTab(newValue))
    setValue(newValue);
  }
  return (
    <Box>
      <Box  sx={{
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '25px'
      }}>
        <Tabs
          value={value} onChange={handlerChange} aria-label="basic tabs example">
          <Tab label={t('modal.settings_video')} tabIndex={0} {...allProps(0)}></Tab>
          <Tab label={t('modal.settings_audio')} tabIndex={1}  {...allProps(1)}></Tab>
          <Tab label={t('modal.settings_user')} tabIndex={2}   {...allProps(2)}></Tab>
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
