import {glagol } from '../../entities/glagol/glagol';
import { Typography, Box } from '@mui/material';
// import {useTranslation} from "react-i18next";

function Header() {
// const {t}=useTranslation()
  return (
    <Box sx={
      {
        position: 'absolute',
        width: '100%',
        marginTop: '25px',
       textAlign: 'center'
      }
    }>
      <Typography color='white'>Имя комнаты: {glagol.roomName}</Typography>
    </Box>
  )
}

export { Header }
