import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { IStore } from '../../../../app/types';

interface IProps {
  action: () => void,
  children: ReactJSXElement,
  text: string
}

const buttonsWithoutToggle = [ 'file', 'record', 'share' ];
const baseClass = 'my-button__toolbox';

function ButtonWrapper(props: IProps) {
  const [ classes, setClasses ] = useState<string>(baseClass);
  const [ toggled, setToggled ] = useState<boolean>(false);
  const { isRecording } = useSelector((state: IStore) => state.interface);
  const { sharing } = useSelector((state: IStore) => state.source);


  function actionClick() {
    if (!buttonsWithoutToggle.includes(props.text)) {
      if (!toggled) {
        setClasses(baseClass + ' my-button__toolbox_toggled');
      } else {
        setClasses(baseClass);
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
        if (sharing !== undefined) {
          setClasses(baseClass + ' my-button__toolbox_toggled_red');
        } else {
          setClasses(baseClass);
        }
        break;
      default:
        break;
    }


  }, [ isRecording, sharing ]);


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
    <Typography>{props.text}</Typography>
  </div>;

}

export { ButtonWrapper };
