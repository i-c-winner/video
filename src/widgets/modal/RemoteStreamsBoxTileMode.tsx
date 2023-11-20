import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { IStore } from '../../app/types';
import { RemoteStream } from '../../entity/model/RemoteStream';
import React from 'react';
import { getRandomText } from '../../features/plugins/getRandomText';

function RemoteStreamsBoxTileMode() {
  const { tileMode } = useSelector((state: IStore) => state.interface);
  function separatingKind(type: string){
    if (type==='audio') {
      return {display: 'none'}
    } return {}
  }

  const { remoteStreams } = useSelector((state: IStore) => state.source);
  {
    return tileMode && <Box>
      <Grid container  spacing={3}>
        {remoteStreams.map((element: any) => {
          return   <React.Fragment>
            <Grid key={getRandomText(5)} sx={()=>element.type==='audio'? {display: 'none'}: {}} item xs={3}>
              <RemoteStream  id={element.id} />
            </Grid>

            </React.Fragment>
          })
        }
          </Grid>
          </Box>
        }
        }

        export {RemoteStreamsBoxTileMode};;
