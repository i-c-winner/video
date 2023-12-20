import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { iconSettings, iconFullscreen, iconVideoQty, iconMuteAll } from '../../shared/img/svg';
import { useTranslation } from 'react-i18next';
import { ButtonWithText } from '../../entity/model/UI/button/ButtonWithText';
import {useDispatch} from 'react-redux';
import {changeTypeModal, openModal} from '../../app/store/interfaceSlice';
import {IInterface} from '../../app/types';
import { selectingButtons } from '../../features/utils/selectingButtons';
import { getRandomText } from '../../features/plugins/getRandomText';
import { IIcon } from '../type';

type TTypeModal = Partial<IInterface['typeModal']>

const buttons = {
  settings: iconSettings,
  settingsVideo: iconVideoQty,
  fullScreen: iconFullscreen,
  allMute: iconMuteAll
} as {
  [key in TTypeModal]: IIcon
}
const allButtons = Object.keys(buttons) as TTypeModal[]
const currentButtons=['settings', 'settingsVideo']
const filteredButtons=selectingButtons(allButtons, currentButtons) as TTypeModal[]
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
            key={getRandomText(8)}>
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
                  styles={{ color: 'white' }} startIcon={buttons[button]} action={actionClick.bind({type: button})}
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
