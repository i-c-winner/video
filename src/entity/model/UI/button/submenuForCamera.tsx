import {Paper} from '@mui/material';
import {ISubmenu} from '../../../types';

function SubmenuForCamera (props: ISubmenu) {
function getStyle() {
  if (props.style) {
    return props.style
  } else {
    return  {}
  }
}
  return (
    <Paper sx={getStyle} >ssdsd</Paper>
  )
}
export {SubmenuForCamera}
