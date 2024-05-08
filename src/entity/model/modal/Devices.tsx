import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { app } from "../../../app/model/constants/app";
import { useTranslation } from "react-i18next";
import { changeDevices } from "../../../features/devices/changeDevices";

const styleInput = {
  color: "white",
  borderRadius: "8px",
  background: "#181818",
};

function Devices() {
  const { t } = useTranslation();
  const [videoDevices, setVideoDevices] = useState<any[]>([]);
  const [audioDevices, setAudioDevices] = useState<any[]>([]);
  const [microphoneDevices, setMicrophoneDevices] = useState<any[]>([]);
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stream = new MediaStream();
    app.glagolVC.webRtc.getSenders().forEach((sender: RTCRtpSender) => {
      if (
        sender.track?.kind === "video" &&
        sender.track?.contentHint !== "detail"
      ) {
        stream.addTrack(sender.track);
      }
    });
    if (refVideo.current) refVideo.current.srcObject = stream;
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setVideoDevices(devices.filter((device) => device.kind === "videoinput"));
      setAudioDevices(
        devices.filter((device) => device.kind === "audiooutput"),
      );
      setMicrophoneDevices(
        devices.filter((device) => device.kind === "audioinput"),
      );
    });
  }, []);
  return (
    <Box sx={{ pointerEvents: "initial" }} display="flex">
      <Box>
        <video
          autoPlay={true}
          className="video video_settings"
          ref={refVideo}
        />
      </Box>
      <Box
        sx={{
          width: "95%",
          marginLeft: "10px",
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-between",
        }}
      >
        <Autocomplete
          sx={styleInput}
          onInputChange={(event, value) => {
            const filteredDevice = videoDevices.filter(
              (device) => device.label === value,
            );
            changeDevices.camera(filteredDevice[0].deviceId);
          }}
          renderInput={(params) => {
            return (
              <TextField
                classes={{
                  root: "input_devices",
                }}
                {...params}
                label={t("modal.settings.video")}
              />
            );
          }}
          options={videoDevices}
        />
        <Autocomplete
          sx={styleInput}
          onInputChange={(event, value) => {
            const filteredDevice = audioDevices.filter(
              (device) => device.label === value,
            );
            console.log(filteredDevice[0]);
            changeDevices.audio();
          }}
          renderInput={(params) => {
            return (
              <TextField
                classes={{
                  root: "input_devices",
                }}
                {...params}
                label={t("modal.settings.audio")}
              />
            );
          }}
          options={audioDevices}
        />
        <Autocomplete
          sx={styleInput}
          onInputChange={(event, value) => {
            const filteredDevice = microphoneDevices.filter(
              (device) => device.label === value,
            );
            changeDevices.mic(filteredDevice[0].deviceId);
          }}
          renderInput={(params) => (
            <TextField
              classes={{
                root: "input_devices",
              }}
              {...params}
              label={t("modal.settings.microphone")}
            />
          )}
          options={microphoneDevices}
        />
      </Box>
    </Box>
  );
}

export { Devices };
