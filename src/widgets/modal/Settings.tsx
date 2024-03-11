import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Tabs, Tab, Button, Typography} from '@mui/material';
import {Devices} from '../../entity/modal/Devices';
import { Profile } from '../../entity/modal/Profile';
import { Calendar } from '../../entity/modal/Calendar';
import { More } from './More';

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
          minHeight: '250px',
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
        margin: '0 10px',
        padding: '4px'
      };
      if (index === value) {
        return {
          ...defaultStyle,
          backgroundColor: '#87bfff',
          borderRadius: '3px',
          color: 'black',
        };
      }
      return { defaultStyle };
    }
  };
}

const Settings = React.forwardRef((props, ref) => {
  const [ value, setValue ] = React.useState(0);
  const {t}=useTranslation()
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
        padding: '3px 6px',
        width,
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
      }}>
        <Typography variant='myText'>{t('modal.settings.settings')}</Typography>
        <Tabs sx={{
          minHeight: 'initial'
        }} TabIndicatorProps={{sx:{display: 'none'}}} textColor="inherit" value={value} onChange={handleChange}
              aria-label="basic tabs example">
          <Tab classes={{root: 'my-button my-button__tabs'}} component="p" label={<Typography variant='myText'>{t('modal.settings.devices')}</Typography>} {...a11yProps(0, value)} />
          <Tab classes={{root: 'my-button my-button__tabs'}} component="p" label={<Typography variant='myText'>{t('modal.settings.profile')}</Typography>} {...a11yProps(1, value)} />
          <Tab classes={{root: 'my-button my-button__tabs'}} component="p" label={<Typography variant='myText'>{t('modal.settings.calendar')}</Typography>}{...a11yProps(2, value)} />
          <Tab classes={{root: 'my-button my-button__tabs'}} component="p" label={<Typography variant='myText'>{t('modal.settings.more')}</Typography>}{...a11yProps(3, value)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Devices />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Profile />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Calendar />
      </CustomTabPanel>   <CustomTabPanel value={value} index={3}>
        <More/>
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
      </Box>
    </Box>

  );
});
export { Settings };
