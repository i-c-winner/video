import { Box, TextField, useTheme } from "@mui/material";
import { styles } from "../../widgets/styles/styles";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowDownTrayIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { IStore } from "../../app/types";
import { saveChat } from "../../features/chats/saveChat";
import { app } from "../../app/model/constants/app";
import { ButtonWrapper } from "./UI/button/ButtonWrapper";
import { addChat } from "../../app/store/chatsSlice";

function ChatInputField() {
  const { glagolVC } = app;
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch();
  const { chatsList } = useSelector((state: IStore) => state.chats);
  const theme = useTheme();

  function sendMessage() {
    setText("");
    if (refInput.current?.value) {
      glagolVC.sendChatMessage(refInput.current?.value);
      dispatch(
        addChat({
          text: refInput.current?.value,
          author: glagolVC.displayName,
        }),
      );
    }
  }

  function changeText(event: any) {
    setText(event.target.value);
  }

  function saveMessages() {
    saveChat(chatsList);
  }

  function getInputBackground() {
    if (theme.palette.mode === "dark") {
      return "input-field input-field_dark";
    }
    return "input-field input-field_light";
  }

  const refInput = useRef<HTMLTextAreaElement>(null);
  return (
    <Box sx={styles.chatsboxLayer.chatInputField}>
      <Box
        sx={{ boxSizing: "border-box" }}
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        <Box>
          <ButtonWrapper action={saveMessages}>
            {<ArrowDownTrayIcon />}
          </ButtonWrapper>
        </Box>
        <TextField
          hiddenLabel={true}
          classes={{
            root: getInputBackground(),
          }}
          onChange={changeText}
          value={text}
          inputRef={refInput}
          id="standard-multiline-flexible"
          multiline
          color="primary"
          maxRows={4}
          variant="standard"
        />
        <ButtonWrapper action={sendMessage}>
          {<PaperAirplaneIcon />}
        </ButtonWrapper>
      </Box>
    </Box>
  );
}

export { ChatInputField };
