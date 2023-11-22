import {Paper} from '@mui/material';
import {ISubmenu} from '../../../types';
import {useAsync} from 'react-async';

const getDevices= async ()=>{
  return navigator.mediaDevices.enumerateDevices()
}



function SubmenuForCamera (props: ISubmenu) {
  const {data, error, isPending} = useAsync({promiseFn: getDevices})
function getStyle() {
  if (props.style) {
    return props.style
  } else {
    return  {}
  }
}
if (data) {
  const cameras=data.filter((element)=>element.kind==='videoinput')
  return cameras.map((camera)=><p>{camera.label}</p>)
}
  return (
    <Paper sx={getStyle} >ssdsd</Paper>
  )
}
export {SubmenuForCamera}
