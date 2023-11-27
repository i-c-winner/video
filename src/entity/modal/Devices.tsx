import { Autocomplete, Box, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { glagol } from '../conference/glagol';

const styleInput = {
  color: 'white',
  borderRadius: '8px',
  background: '#181818'
};

function Devices() {

  const [ videoDevices, setVideoDevices ] = useState<{ label: string }[]>([]);
  const [ audioDevices, setAudioDevices ] = useState<{ label: string }[]>([]);
  const [ microphoneDevices, setMicrophoneDevices ] = useState<{ label: string }[]>([]);
  const refVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const stream = new MediaStream();
    glagol.peerConnection.getSenders().forEach((sender) => {
      if (sender.track?.kind === 'video' && sender.track?.contentHint !== 'detail') {
        stream.addTrack(sender.track);
      }
    });
    if (refVideo.current) refVideo.current.srcObject = stream;
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log(devices, 'Devices');
      setVideoDevices(devices.filter((device) => device.kind === 'videoinput'));
      setAudioDevices(devices.filter((device) => device.kind === 'audiooutput'));
      setMicrophoneDevices(devices.filter((device) => device.kind === 'audioinput'));
    });
  }, []);
  return (
    <Box sx={{ pointerEvents: 'initial' }} display="flex">
      <Box>
        <video autoPlay={true} className="video video_settings" ref={refVideo}/>
      </Box>
      <Box
        sx={{
          width: '95%',
          marginLeft: '10px',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between'
        }}>
        <Autocomplete sx={styleInput} renderInput={(params) => <TextField
          classes={{
            root: 'input_devices'
          }}
         {...params} label="video"/>} options={videoDevices}/>
        <Autocomplete  sx={styleInput} renderInput={(params) => <TextField
          classes={{
            root: 'input_devices'
          }}{...params} label="audio"/>}
                      options={audioDevices}/>
        <Autocomplete sx={styleInput} renderInput={(params) => <TextField
          classes={{
            root: 'input_devices'
          }}{...params} label="microphone"/>}
                      options={microphoneDevices}/>
      </Box>

    </Box>
  );
}

export { Devices };
