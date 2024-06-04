import { Box, Typography } from "@mui/material";
import "./styles/index.scss";
import { CircularProgress } from "@mui/material";


function LoadIndicator(props: { file: string, progress: number }) {
  return <Box sx={{
    position: "absolute",
    bottom: "150px",
    right: "50px",
    display: "flex",
    flexFlow: "column",
    alignItems: "center"
  }}>
    <Box sx={{
      marginBottom: "25px"
    }}>
      <Typography sx={{
        textShadow: "0px 0px 3px black",
        fontSize: "20px"
      }} variant="myText">{props.file}</Typography>;
    </Box>
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={props.progress * 10} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{props.progress * 10} %</Typography>
      </Box>
    </Box>
  </Box>;
}

export { LoadIndicator };