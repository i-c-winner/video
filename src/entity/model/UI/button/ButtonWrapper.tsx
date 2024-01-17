import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface IProps {
  action: () => void,
  children: ReactJSXElement,
  text: string
}

const buttonsWithoutToggle =['file','record']
function ButtonWrapper(props: IProps) {
  const [ toggled, setToggled ] = useState<boolean>(false);

  function getStyle() {
    if (buttonsWithoutToggle.includes(props.text)) {
      return 'my-button__toolbox';
    } else if (toggled) {
      return 'my-button__toolbox my-button__toolbox_toggled';
    }
    return 'my-button__toolbox';
  }

  function actionClick() {
    setToggled(!toggled);
    props.action();
  }

  return <div className='button-box'>

    <div
      onClick={actionClick}
      className={getStyle()}>
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
