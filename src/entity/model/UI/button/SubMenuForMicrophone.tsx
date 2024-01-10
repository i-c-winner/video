import { Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { ISubmenu } from '../../../types';
import { useAsync } from 'react-async';
import { Submenu } from './Submenu';
import Radio from '@mui/material/Radio';
import { SyntheticEvent } from 'react';
import RadioGroup from '@mui/material/RadioGroup';

const getDevices = async () => {
  return navigator.mediaDevices.enumerateDevices();
};


function SubmenuForMicrophone(props: ISubmenu) {
  const { data, error, isPending } = useAsync({ promiseFn: getDevices });

  function getStyle() {
    if (props.style) {
      return props.style;
    } else {
      return {};
    }
  }



  if (data) {
    const microphone = data.filter((element) => element.kind === 'audioinput');
    const audio = data.filter((element) => element.kind === 'audiooutput');
    return <Submenu>
      <RadioGroup
        // onChange={selectingItem}
        defaultValue="default"
      >
        {audio.map((audio) => <FormControlLabel
          control={<Radio/>}
          value={audio.label.toLowerCase()}
          label={<Typography
            sx={{
              whiteSpace: 'nowrap'
            }}
          >{audio.label}</Typography>}
        />)}
      </RadioGroup>
      <RadioGroup
        defaultValue="default"
        // onChange={selectingItem}
      >
        {microphone.map((microphone) => <FormControlLabel
          control={<Radio/>}
          value={microphone.label.toLowerCase()}
          label={<Typography
            sx={{
              whiteSpace: 'nowrap'
            }}
          >{microphone.label}</Typography>}
        />)}
      </RadioGroup>

    </Submenu>;
  }
  return (
    <Paper sx={getStyle}>...Pending</Paper>
  );
}

export { SubmenuForMicrophone };
