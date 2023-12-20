import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { iconSettings, iconFullscreen, iconVideoQty, iconMuteAll } from '../../shared/img/svg';
import { useTranslation } from 'react-i18next';
import { ButtonWithText } from '../../entity/model/UI/button/ButtonWithText';
import {useDispatch} from 'react-redux';
import {changeTypeModal, openModal} from '../../app/store/interfaceSlice';
import {IInterface} from '../../app/types';
import { selectingButtons } from '../../features/utils/selectingButtons';

interface IIcon {
  attributes: {
    [key: string]: string
  },
  content: string,
}
type TTypeModal = Partial<IInterface['typeModal']>

const buttons: [ TTypeModal, IIcon ][] = [ [ 'settings', iconSettings ], [ 'settingsVideo', iconVideoQty ], [ 'fullScreen', iconFullscreen ], [ 'allMute', iconMuteAll ] ];
const currentButtons=['settings', 'settingsVideo']
const filteredButtons=selectingButtons(buttons, currentButtons)
const styleBox = {
  bgcolor: 'background.windows',
  margin: '10px 150px auto auto',
  width: 'auto'
};



const More = React.forwardRef((props, ref) => {
  const dispatch=useDispatch()
  function actionClick(this: { type:  TTypeModal}) {
    dispatch(changeTypeModal(this.type))
    dispatch(openModal(true))
    console.log(this.type);
  }
  const { t } = useTranslation();
  return <Box sx={styleBox}>
    <nav>
      <List classes={{
        root: 'list'
      }}>
        {filteredButtons.map((button) => {
          return <ListItem
            classes={{
              root: 'list-more list-more__listitem'
            }}
            sx={{
              padding: '0'
            }}
            key={button[0]}>
            <ListItemButton
              sx={{
                padding: '0'
              }}
              divider={true}>
              <ListItemText sx={{
                color: 'white',
                padding: '0'
              }}>
                <ButtonWithText
                  classes={{
                    root: 'margin_zero button_zero'
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
      </List>

    </nav>
  </Box>;
});

export { More };
