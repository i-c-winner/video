import { CreateSvgIcon } from "../../widgets/createSvgIcon/CreateSvgIcon";
import { iconLogo } from "../../shared/img/svg";
import { Box, Typography } from "@mui/material";

function Logo() {

  return (
    <Box sx={{
      display: 'flex',
      top: '15px',
      left: '15px',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 10
    }}>
      <CreateSvgIcon
        styles={{
          marginRight: "10px"
        }}
        sizes={{
          width: '50px',
          height: '50px'
        }}

        attributes={iconLogo.attributes} content={iconLogo.content}/>
      <Typography sx={{
        color: 'white',
        fontSize: '35px'
      }} >Glagol</Typography>
    </Box>

  );
}

export { Logo };
