import { inputStyles } from "../../page/styles/styles";

function getInputStyles() {
  if (window.screen.width > 720) {
    return inputStyles["720"];
  } else {
    return inputStyles["520"];
  }
}

export { getInputStyles };
