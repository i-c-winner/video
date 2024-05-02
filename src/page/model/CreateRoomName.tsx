import { BaseSyntheticEvent, useEffect, useRef } from "react";
import { Box, Input, Typography, Button } from "@mui/material";
import { styles } from "../styles/styles";
import { getInputStyles } from "../../features/styles/getInputStyles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { app } from "../../app/model/constants/app";


function CreateRoomName() {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const refInput = useRef<HTMLElement>();

  function change(event: BaseSyntheticEvent) {
    app.roomName = event.target.value;
  }

  const buttonText: any = "interface.buttons.createRoomName";

  function actionClick() {
    navigate(`/creatername`);
  }

  useEffect(() => {
    function handlerKey(event: WindowEventMap['keydown']) {
      if (event.key==="Enter") {
        actionClick();
      }
    }
    window.addEventListener("keydown", handlerKey);
    return () => {
      window.removeEventListener("keydown", handlerKey);
    };
  });
  return <Box sx={styles.wrapper}>
    <Input placeholder="Input RoomName" onChange={change} sx={getInputStyles()} ref={refInput}/>
    <Button onClick={actionClick}>
      <Typography variant="myText">{t(buttonText)}</Typography>
    </Button>
  </Box>;
}

export { CreateRoomName };
