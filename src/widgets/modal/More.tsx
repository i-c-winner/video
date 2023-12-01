import { Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { iconSettings, iconFullscreen, iconVideoQty, iconMuteAll } from '../../shared/img/svg';
import { useTranslation } from 'react-i18next';
import { ButtonWithText } from '../../entity/model/UI/button/ButtonWithText';

interface IIcon {
  attributes: {
    [key: string]: string
  },
  content: string,
}

const buttons: [ string, IIcon ][] = [ [ 'settings', iconSettings ], [ 'changeQty', iconVideoQty ], [ 'fullScreen', iconFullscreen ], [ 'allMute', iconMuteAll ] ];
const styleBox = {
  bgcolor: 'background.paper',
  margin: '10px 150px auto auto',
  padding: '15px 20px',
  width: '350px'
};

function actionClick(this: { type: string }) {
  console.log(this.type);
}

const More = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  return <Box sx={styleBox}>
    <nav>
      {buttons.map((button) => {
        return <ListItem key={button[0]}>
          <ListItemButton divider={true}>
            <ListItemText sx={{ color: 'white' }}>
              <ButtonWithText
                classes={{
                  root: 'margin_zero'
                }}
                sizes={{
                  width: '40px',
                  height: '40px'
                }}
                styles={{ color: 'white' }} startIcon={button[1]} action={actionClick.bind({ type: button[0] })}
                text={t(`modal.more.${button[0]}`)}
              />
            </ListItemText>
          </ListItemButton>
        </ListItem>;
      })}
    </nav>
  </Box>;
});

export { More };
