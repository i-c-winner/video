import { Box } from '@mui/material';
import { ReactNode } from 'react';

function Submenu(props: {children: ReactNode}) {
  return <Box

  sx={{
    padding: '10px',
    bgcolor: 'white'
  }}
  >
    {props.children}
  </Box>
}
export {Submenu}
