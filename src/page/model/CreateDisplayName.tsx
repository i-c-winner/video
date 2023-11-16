import React from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../entity/conference/glagol';
import { Box } from '@mui/material';
import { styles } from '../styles/styles.';
import {useTranslation} from 'react-i18next';

const connection = async () => {
  return glagol.setLocalStream();
};
const CreateDisplayName = React.forwardRef<HTMLInputElement>((props, ref) => {
  const { data, error, isPending } = useAsync({ promiseFn: connection });
  const {t, i18n}=useTranslation()
  if (isPending) {
    return <p>...Pending</p>;
  }
  if (data) {
    data.getTracks().forEach((track) => {
      glagol.peerConnection.addTrack(track)
    });
    glagol.peerConnectionAddHandlers();
    return <Box sx={styles.wrapper}>
      <input ref={ref}/>
    </Box>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateDisplayName };
