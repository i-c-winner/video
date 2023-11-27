import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import {Box, Tabs, Tab, Button, Typography} from '@mui/material';
import {Devices} from '../../entity/modal/Devices';
import { Profile } from '../../entity/modal/Profile';

const width = '600px';

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: ITabPanelProps) {
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

function a11yProps(index: number, value: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    sx: () => {
      const defaultStyle = {
        marginBottom: '10px'
      };
      if (index === value) {
        return {
          ...defaultStyle,
          background: '#87bfff',
          borderRadius: '7px',
          color: 'black'
        };
      }
      return { defaultStyle };
    }
  };
}

const Settings = React.forwardRef((props, ref) => {
  const [ value, setValue ] = React.useState(0);

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
        width,
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
      }}>
        <Typography color="white">Настройки</Typography>
        <Tabs TabIndicatorProps={{sx:{display: 'none'}}} textColor="inherit" value={value} onChange={handleChange}
              aria-label="basic tabs example">
          <Tab component="p" label="Устройства" {...a11yProps(0, value)} />
          <Tab component="p" label="Профиль" {...a11yProps(1, value)} />
          <Tab component="p" label="Календарь" {...a11yProps(2, value)} />
          <Tab component="p" label="Больше" {...a11yProps(3, value)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Devices />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Profile />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <Box sx={{
        margin: '0 auto',
        width,
        bgcolor: 'background.paper',
        textAlign: 'right',
        padding: '10px',
        boxSizing: 'border-box',
        pointerEvents: 'initial'

      }}>
        {/*<Button>close</Button>*/}
        {/*<Button disabled={!wasChanged} variant="outlined">Сохранить и закрыть</Button>*/}
      </Box>
    </Box>

  );
});
export { Settings };
