import {Box, Button} from '@mui/material';
import {useState} from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
interface IProps {
  action: ()=>void,
  children: ReactJSXElement
}


function ButtonWrapper (props: IProps) {
  const [toggled, setToggled] = useState<boolean>(false)
  function getStyle () {
    if (toggled) {
      return 'my-button__toolbox my-button__toolbox_toggled'
    } return 'my-button__toolbox'
  }
  function actionClick() {
    setToggled(!toggled)
    props.action()
  }
  return <div
    onClick={actionClick}
    className={getStyle()}>
    <Box
      sx={{
        height: '24px',
        width: '24px',
        margin: '0 auto'
      }}
    >
      {props.children}
    </Box>
  </div>
}

export {ButtonWrapper}
