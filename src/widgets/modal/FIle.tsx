import React from 'react';
import { Box, Button, Input, styled, Typography } from '@mui/material';
import {CloudUpload} from '@mui/icons-material';

const File = React.forwardRef((props, ref) => {
  const VisuallyHiddenInput = styled('input')({
    // clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  return <Box
    sx={
      {
        margin: '25vh auto auto',
        bgcolor: 'background.paper',
        minWidth: '500px',

      }
    }>
    <Box>
      <Typography>Выберите файл</Typography>
      <Button component="label" variant="contained" startIcon={<CloudUpload/>}>
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
    </Box>
  <Box>

  </Box>;
</Box>
});
export { File };
