import { ISettingsProps } from '../../types';
import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, FormControl, FormLabel, RadioGroup, FormControlLabel,Switch,  Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeModalVisible, changeQuantityVideo } from '../../../app/store/configSlice';
import { IRootState } from '../../../app/types';

const qualityVideo = [ 'HEIGHT', 'MIDDLE', 'LOW', 'DISABLED' ];

function SettingsVideo(props: ISettingsProps) {
  const { t } = useTranslation();

  const { videoQuantity } = useSelector((state: IRootState) => state.config.conference);
  const [currentValue, setCurrentValue]= useState(videoQuantity)
  const dispatch = useDispatch();
  const [ view, setView ] = React.useState(videoQuantity);
  function onChange(event: any){
dispatch(changeQuantityVideo(event.target.value))
  }
function isChecked(type: string) {
    return videoQuantity=== type
}
  const { value, index } = props;
  return value === index && (
    <FormControl onChange={onChange}>
        <FormControlLabel classes={{
          label: 'switch_label'
        }} value="height"  control={<Switch checked={isChecked('height')}/>} label={t(`modal.quantity_video.height`)} />
        <FormControlLabel classes={{
          label: 'switch_label'
        }}  value="middle" control={<Switch checked={isChecked('middle')} />} label={t('modal.quantity_video.middle')} />
        <FormControlLabel classes={{
          label: 'switch_label'
        }}  value="low" control={<Switch checked={isChecked('low')} />} label={t('modal.quantity_video.low')} />
        <FormControlLabel classes={{
          label: 'switch_label'
        }}  value="disabled" control={<Switch checked={isChecked('disabled')}/>} label={t('modal.quantity_video.disabled')} />
    </FormControl>
  );
}

export { SettingsVideo };
