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
          marginRight: "10px",

        }}
        sizes={{
          width: '60px',
          height: '60px',
          viewBox: '0 0 32 32'
        }
        }
        icon={iconLogo}/>
      <Typography sx={{
        color: 'white',
        fontSize: '35px'
      }}>Glagol</Typography>
    </Box>

  );
}

export { Logo };
