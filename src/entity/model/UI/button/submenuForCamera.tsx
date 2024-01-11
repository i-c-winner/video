import { Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { ISubmenu } from '../../../types';
import { useAsync } from 'react-async';
import { Submenu } from './Submenu';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

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

  function selectingItem(ev: any) {
    ev.stopPropagation();
    console.log(ev.target, ev, 'TArget');
  }

  if (data) {
    function getDefault() {
      return cameras.length === 1 ? cameras[0].label.toLowerCase() : 'default';
    }

    const cameras = data.filter((element) => element.kind === 'videoinput');
    return <Submenu>
      <RadioGroup
        defaultValue={getDefault()}
        onChange={selectingItem}
      >
        {cameras.map((camera) => {
          return <FormControlLabel
            control={<Radio/>}
            value={camera.label.toLowerCase()}
            label={<Typography
              sx={{
                whiteSpace: 'nowrap'
              }}
            >{camera.label}</Typography>}
          />;
        })}
      </RadioGroup>
    </Submenu>;
  }
  return (
    <Paper sx={getStyle}>...Pending</Paper>
  );
}

export { SubmenuForCamera };
