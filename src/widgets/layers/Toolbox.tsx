import { Box, useTheme } from "@mui/material";
import { ModalWindow } from "../modal/ModalWindow";
import { styles } from "../styles/styles";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  FolderPlusIcon,
  MicrophoneIcon,
  ShareIcon,
  StopCircleIcon,
  VideoCameraIcon
} from "@heroicons/react/16/solid";
import { ButtonWrapper } from "../../entity/model/UI/button/ButtonWrapper";
import {
  changeChatsBox,
  changeIsRecording,
  changeTypeModal,
  openModal
} from "../../app/store/interfaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { IInterface, IStore } from "../../app/types";
import { useEffect, useState } from "react";
import { Recording } from "../../features/manager/record";
import { MicOff } from "@mui/icons-material";
import { VideoCameraSlashIcon } from "@heroicons/react/24/solid";
import { app } from "../../app/model/constants/app";
import { addFile } from "../../app/store/filesSlice";
import { addChat } from "../../app/store/chatsSlice";
import { LoadIndicator } from "../LoadIndicator";

let recording: Recording | null = null;

function Toolbox() {
  const glagolVC = app.glagolVC;
  const [iSharing, setISharing] = useState<boolean>(false);
  const { chatsBoxVisible, isRecording, modalIsOpen } = useSelector(
    (state: IStore) => state.interface
  );
  const [cameraIsWorking, setCameraIsWorking] = useState<boolean>(true);
  const [microphoneIsWorking, setMicrophoneIsWorking] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [colorText, setColorText] = useState<"grey" | "black">("grey");
  const theme = useTheme();
  const [file, setFile] = useState<string>("");
  const [indicatorsIsVisible, setIndicatorsIsVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  function loadsIndicatorChanged(...args: [[{ status: string, fileName?: string, progress?: number }]]) {
    const data = args[0][0];
    console.log(data);
    if (data.status === "start") {
      setFile(data.fileName!);
      setIndicatorsIsVisible(true);
    } else if (data.status === "progress") {
      setProgress(data.progress!);
    } else {
      setIndicatorsIsVisible(false);
      setProgress(0);
      setFile("");
    }
  }

  function openChat() {
    dispatch(changeChatsBox(!chatsBoxVisible));
  }

  function recordAction() {
    dispatch(changeIsRecording(!isRecording));
  }

  function sharingAction() {
    if (iSharing) {
      glagolVC.sharingStop();
      setISharing(false);
    } else {
      setISharing(true);
      glagolVC.sharingStart();
    }
  }

  function openingModal(this: { type: IInterface["typeModal"] }) {
    dispatch(changeTypeModal(this.type));
    dispatch(openModal(!modalIsOpen));
  }

  function toggledCamera() {
    const cameraIsWorking = app.glagolVC.glagolManager.cameraIsWorking;
    if (cameraIsWorking) {
      app.glagolVC.glagolManager.switchOffCamera();
    } else {
      app.glagolVC.glagolManager.switchOnCamera();
    }
  }

  function toggledMicrophone() {
    const microphoneIsWorking = app.glagolVC.glagolManager.microphoneIsWorking;
    if (microphoneIsWorking) {
      app.glagolVC.glagolManager.switchOffMic();
    } else {
      app.glagolVC.glagolManager.switchOnMic();
    }
  }

  function fileDownload(args: [string, string]) {
    dispatch(
      addFile({
        text: args[0],
        idRemote: args[1]
      })
    );
  }

  function abortingSharing() {
    setISharing(false);
  }

  function setMessageChat(
    chat: [{ text: string; author: string; id?: string }]
  ) {
    dispatch(addChat(chat[0]));
  }

  function cameraSwitchOff() {
    setCameraIsWorking(false);
  }

  function cameraSwitchOn() {
    setCameraIsWorking(true);
  }

  function microphoneSwitchOff() {
    setMicrophoneIsWorking(false);
  }

  function microphoneSwitchOn() {
    setMicrophoneIsWorking(true);
  }

  function changeCameraAndMic() {
    const cameraIsWorking = app.glagolVC.glagolManager.cameraIsWorking;
    const microphoneIsWorking = app.glagolVC.glagolManager.microphoneIsWorking;
    if (!cameraIsWorking) cameraSwitchOff();
    if (!microphoneIsWorking) microphoneSwitchOff();
  }

  function setHandlers() {
    glagolVC.glagolManager.setHandler("cameraSwitchOff", cameraSwitchOff);
    glagolVC.glagolManager.setHandler("cameraSwitchOn", cameraSwitchOn);
    glagolVC.glagolManager.setHandler(
      "microphoneSwitchOff",
      microphoneSwitchOff
    );
    glagolVC.glagolManager.setHandler("microphoneSwitchOn", microphoneSwitchOn);
  }

  useEffect(() => {
    app.glagolVC.setHandler("loadsIndicatorChanged", loadsIndicatorChanged);
  }, []);
  useEffect(() => {
    glagolVC.setHandler("abortingSharing", abortingSharing);
    glagolVC.setHandler("fileDownload", fileDownload);
    glagolVC.setHandler("setMessageChat", setMessageChat);
    glagolVC.setHandler("roomOn", setHandlers);
    glagolVC.setHandler("roomOn", changeCameraAndMic);
    return () => {
      /**
       * TODO remove handler
       */
    };
  }, []);
  useEffect(() => {
    setColorText(() => {
      return theme.palette.mode === "dark" ? "grey" : "black";
    });
  }, [theme]);

  useEffect(() => {
    if (isRecording) {
      const rec = new Recording();
      rec
        .init()
        .then((result) => {
          rec.createRecorder(result);
          rec.createListeners();
          rec.start();
          recording = rec;
        })
        .catch((error) => {
          new Error(error);
          dispatch(changeIsRecording(false));
        });
    } else {
      recording?.stop();
    }
  }, [isRecording]);

  return (
    <Box sx={styles.toolboxLayer}>
      <ModalWindow />
      <Box
        sx={{
          ...styles.toolboxLayer.toolbox,
          color: colorText
        }}
      >
        <ButtonWrapper text="chat" action={openChat}>
          <ChatBubbleOvalLeftEllipsisIcon color={colorText} />
        </ButtonWrapper>
        <ButtonWrapper
          disabled={indicatorsIsVisible}
          text="file"
          action={openingModal.bind({
            type: "file"
          })}
        >
          <FolderPlusIcon color={colorText} />
        </ButtonWrapper>
        <ButtonWrapper toggled={iSharing} text="share" action={sharingAction}>
          <ShareIcon color={colorText} />
        </ButtonWrapper>
        <ButtonWrapper text={"record"} action={recordAction}>
          <StopCircleIcon color={colorText} />
        </ButtonWrapper>
        <ButtonWrapper
          text={"mic"}
          toggled={microphoneIsWorking}
          action={toggledMicrophone}
        >
          {microphoneIsWorking ? (
            <MicrophoneIcon color={colorText} />
          ) : (
            <Box sx={{ color: "white" }}>
              <MicOff />
            </Box>
          )}
        </ButtonWrapper>
        <ButtonWrapper
          text={"camera"}
          toggled={cameraIsWorking}
          action={toggledCamera}
        >
          {cameraIsWorking ? (
            <VideoCameraIcon color={colorText} />
          ) : (
            <VideoCameraSlashIcon color="white" />
          )}
        </ButtonWrapper>
      </Box>
      {indicatorsIsVisible && <LoadIndicator file={file} progress={progress} />}
    </Box>
  );
}

export { Toolbox };
