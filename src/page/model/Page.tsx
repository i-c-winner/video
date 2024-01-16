import { TopPanel } from '../../widgets/layers/TopPanel';
import { Toolbox } from '../../widgets/layers/Toolbox';
import { ChatsBox } from '../../widgets/layers/ChatsBox';
import { Box } from '@mui/material';
import { LocalStream } from '../../widgets/layers/Localstream';

function Page() {
  return <Box
    sx={{
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      bgcolor: 'background.paper',
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <Box sx={{
      flexGrow: '1',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between'
    }}>
      <TopPanel/>
      <LocalStream />
      <Toolbox/>
    </Box>
    <ChatsBox/>

  </Box>;

}

export { Page };
