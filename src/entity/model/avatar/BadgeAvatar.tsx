import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import face1 from '../../../shared/img/image/face1.jpeg'


interface  IProps{
sizes: {width: number, height: number},
  styles: {
  color: string
  }
}
type TProps= Partial<IProps>




 function BadgeAvatars(props:  TProps) {
   const MyAvatar = styled(Avatar)(({ theme }) => ({
     width: props.sizes?.width,
     height: props.sizes?.height,
     border: `2px solid ${theme.palette.background.paper}`,
   }));
   const StyledBadge = styled(Badge)(({ theme }) => ({
     '& .MuiBadge-badge': {
       backgroundColor: props.styles?.color!=='undefined'? props.styles?.color: 'red',
       color: props.styles?.color!=='undefined'? props.styles?.color: 'red',
       boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
       '&::after': {
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         borderRadius: '50%',
         animation: 'ripple 1.2s infinite ease-in-out',
         border: '1px solid currentColor',
         content: '""',
       },
     },
     '@keyframes ripple': {
       '0%': {
         transform: 'scale(.8)',
         opacity: 1,
       },
       '100%': {
         transform: 'scale(2.4)',
         opacity: 0,
       },
     },
   }));



   return (
    <Stack sx={{
      width: '100%'
    }} direction="row" spacing={2}>
      <StyledBadge
        sx={{
          margin: '0 auto !important',
        }}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <MyAvatar sizes={"50vw"} alt="Remy Sharp" src={face1} />
       </StyledBadge>
     </Stack>
   );
}
export {BadgeAvatars}
