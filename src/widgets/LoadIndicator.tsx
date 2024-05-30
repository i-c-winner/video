import { Box, Typography } from "@mui/material";
import "./styles/index.scss"

interface IProps {
  amountCounts: number[],
  currentAmount: number,
  fileName: string,
}

function LoadIndicator(props: IProps) {

  return <Box sx={{
    position: "absolute",
    bottom: "150px",
    right: "30px",
    display: "flex",
    flexFlow: "column",
  }}>
    <Typography variant="myText" color="white" sx={{textShadow: "1px 1px 2px black"}}>{props.fileName}</Typography>
    <Box sx={{
      display: "flex"
    }}>
      {props.amountCounts.map((element, index) => {
        return <div className={index <= props.currentAmount ? "indicator indicator_loaded": "indicator"}></div>;
      })}
    </Box>


  </Box>;
}

export { LoadIndicator };