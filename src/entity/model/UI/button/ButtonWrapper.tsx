import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { IStore } from '../../../../app/types';
import { useTranslation } from 'react-i18next';

interface IProps {
  action: () => void,
  children: ReactJSXElement,
  text?: string,
  toggled?: boolean

}

const buttonsWithoutToggle = [ 'file', 'record', 'share' ];
const baseClass = 'my-button__toolbox';

function ButtonWrapper(props: IProps) {
  const [ classes, setClasses ] = useState<string>(baseClass);
  const [ toggled, setToggled ] = useState<boolean>(false);
  const { isRecording, chatsBoxVisible } = useSelector((state: IStore) => state.interface);
  const { video, audio } = useSelector((state: IStore) => state.interface.conference.quality);
  const { sharing } = useSelector((state: IStore) => state.source);
  const { t } = useTranslation();

  function actionClick() {
    if (props?.text) {
      if (!buttonsWithoutToggle.includes(props.text)) {
        if (!toggled) {
          setClasses(baseClass + ' my-button__toolbox_toggled');
        } else {
          setClasses(baseClass);
        }
      }
    }
    setToggled(!toggled);
    props.action();
  }

  useEffect(() => {
    switch (props.text) {
      case 'record':
        if (isRecording) {
          setClasses(baseClass + ' my-button__toolbox_toggled_red');
        } else {
          setClasses(baseClass);
        }
        break;
      case 'share':
        if (props.toggled) {
          setClasses(baseClass + ' my-button__toolbox_toggled_red');
        } else {
          setClasses(baseClass);
        }
        break;
      case 'camera':
        if (video === 'disabled') {
          setClasses(baseClass + ' my-button__toolbox_toggled_red');
        } else {
          setClasses(baseClass);
        }
        break;
      case 'mic':
        if (audio === 'disabled') {
          setClasses(baseClass + ' my-button__toolbox_toggled_red');
        } else {
          setClasses(baseClass);
        }
        break;
      case 'chat':
        if (chatsBoxVisible) {
          setClasses(baseClass + ' my-button__toolbox_toggled');
        } else {
          setClasses(baseClass);
        }
        break;
      default:
        break;
    }


  }, [ isRecording, sharing, audio, video, chatsBoxVisible ]);


  return <div className="button-box">

    <div
      onClick={actionClick}
      className={classes}>
      <Box
        sx={{
          height: '24px',
          width: '24px',
          margin: '0 auto',
        }}
      >
        {props.children}
      </Box>
    </div>
    {props.text && <Typography variant={'myText'}>{t(`interface.icons.${props.text}`)}</Typography>}
  </div>;

}

export { ButtonWrapper };
