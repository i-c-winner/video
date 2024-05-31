import { Box, Typography } from "@mui/material";
import "./styles/index.scss";

function LoadIndicator(props: { file: string }) {
  return <Box sx={{
    position: "absolute",
    bottom: "150px",
    right: "30px",
    display: "flex",
    flexFlow: "column"
  }}>
    <Box sx={{
      display: "flex"
    }}>
      <Typography sx={{
        textShadow: "0px 0px 3px black",
        fontSize: "20px",
      }} variant="myText">{props.file}</Typography>;
    </Box>
  </Box>;
}

export { LoadIndicator };