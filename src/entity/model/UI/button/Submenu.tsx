import { Box } from '@mui/material';
import { ReactNode } from 'react';

function Submenu(props: { children: ReactNode }) {
  return <Box
    sx={{
      color: 'white',
      padding: '10px',
      bgcolor: 'background.paper',
      '&:checked': {
        color: 'green'
      }
    }}
  >
    {props.children}
  </Box>;
}

export { Submenu };
