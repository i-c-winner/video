import { Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { ISubmenu } from '../../../types';
import { useAsync } from 'react-async';
import { Submenu } from './Submenu';
import Radio from '@mui/material/Radio';
import { SyntheticEvent } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getRandomText } from '../../../../features/plugins/getRandomText';
import { glagol } from '../../../conference/glagol';

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

  function selectingAudio(ev: any, type: string) {
    ev.stopPropagation();
    console.log(ev.target, ev, 'TArget');
    glagol.changeTrack(ev.target.value, 'audio')

  }

  function getCurrentMicrophone() {
    const result = {
      microphone: '',
      camera: ''
    };
    const senders = glagol.peerConnection.getSenders();
    senders.map((sender) => {
      if (sender.track?.kind === 'audio') {
        result.microphone = sender.track?.label;
      } else if (sender.track?.kind==='video') {
        result.camera=sender.track?.label
      }
    });
    return result;
  }

  if (data) {
    const microphone = data.filter((element) => element.kind === 'audioinput');
    const audio = data.filter((element) => element.kind === 'audiooutput');
    return <Submenu>
      {/*<RadioGroup*/}
      {/*  onChange={selectingItem}*/}
      {/*  defaultValue="Default"*/}
      {/*>*/}
      {/*  {audio.map((audio) => <FormControlLabel*/}
      {/*    key={getRandomText(5)}*/}
      {/*    control={<Radio/>}*/}
      {/*    value={audio.label}*/}
      {/*    label={<Typography*/}
      {/*      sx={{*/}
      {/*        whiteSpace: 'nowrap'*/}
      {/*      }}*/}
      {/*    >{audio.label}</Typography>}*/}
      {/*  />)}*/}
      {/*</RadioGroup>*/}
      <FormControl>
        <FormLabel id="sub-menu-microphone">Выберите микрофон</FormLabel>
        <RadioGroup
          aria-labelledby="sub-menu-microphone"
          defaultValue={getCurrentMicrophone().microphone}
          onChange={selectingAudio}
        >
          {microphone.map((microphone) => <FormControlLabel
            key={getRandomText(5)}
            control={<Radio/>}
            value={microphone.label}
            label={<Typography
            sx={{
              whiteSpace: 'nowrap'
            }}
            >{microphone.label}</Typography>}
          />)}
        </RadioGroup>
      </FormControl>
    </Submenu>;
  }
  return (
    <Paper sx={getStyle}>...Pending</Paper>
  );
}

export { SubmenuForMicrophone };
