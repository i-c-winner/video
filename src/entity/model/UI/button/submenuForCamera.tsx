import { Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { ISubmenu } from '../../../types';
import { useAsync } from 'react-async';
import { Submenu } from './Submenu';
import Radio from '@mui/material/Radio';
import { SyntheticEvent } from 'react';

const getDevices = async () => {
  return navigator.mediaDevices.enumerateDevices();
};


function SubmenuForCamera(props: ISubmenu) {
  const { data, error, isPending } = useAsync({ promiseFn: getDevices });

  function getStyle() {
    if (props.style) {
      return props.style;
    } else {
      return {};
    }
  }
function selectingItem(event: SyntheticEvent) {
  console.log(event)
}
  if (data) {
    const cameras = data.filter((element) => element.kind === 'videoinput');
    return <Submenu>
      <FormGroup
      onChange={selectingItem}
      >
        {cameras.map((camera) => <FormControlLabel
          control={<Radio />}
          label={<Typography
          sx={{
            whiteSpace: 'nowrap'
          }}
          >{camera.label}</Typography>}
        />)}
      </FormGroup>

    </Submenu>;
  }
  return (
    <Paper sx={getStyle}>...Pending</Paper>
  );
}

export { SubmenuForCamera };
