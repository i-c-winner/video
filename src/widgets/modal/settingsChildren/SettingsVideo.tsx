import { ISettingsProps } from '../../types';
import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeModalVisible, changeQuantityVideo } from '../../../app/store/configSlice';

const qualityVideo = [ 'HEIGHT', 'MIDDLE', 'LOW', 'DISABLED' ];

function SettingsVideo(props: ISettingsProps) {
  const { t } = useTranslation();
  const { videoQuantity } = useSelector((state: any) => state.config.conference);
  const dispatch = useDispatch();
  const [ view, setView ] = React.useState(videoQuantity);
  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
    dispatch(changeQuantityVideo(nextView))
  };

  const { value, index } = props;
  return value === index && (
    <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
    >
      {qualityVideo.map((type: string, index) => {
        return <ToggleButton key={index} value={type} aria-label={type}>{t(`modal.quantity_video.${type}`)}</ToggleButton>;
      })}
    </ToggleButtonGroup>
  );
}

export { SettingsVideo };
