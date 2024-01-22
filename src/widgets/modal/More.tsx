import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {useDispatch} from 'react-redux';
import {changeTypeModal, openModal} from '../../app/store/interfaceSlice';
import {IInterface} from '../../app/types';
import { selectingButtons } from '../../features/utils/selectingButtons';
import { getRandomText } from '../../features/plugins/getRandomText';
import {Cog8ToothIcon} from '@heroicons/react/24/outline';
import {ChartBarIcon } from '@heroicons/react/24/outline';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {useTheme} from '@mui/material';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';

type TTypeModal = Partial<IInterface['typeModal']>

const styleBox = {
  bgcolor: 'background.windows',
  margin: '10px 150px auto auto',
  width: 'auto'
};



const More = React.forwardRef((props, ref) => {
const theme=useTheme()
  function getColor () {
  return theme.palette.mode==='dark'? 'grey': 'black'
  }
  const buttons = {
    settings: <Cog8ToothIcon color={getColor()}/>,
    settingsVideo: <ChartBarIcon color={getColor()}/>,
  } as {
    [key in TTypeModal]: ReactJSXElement
  }
  const allButtons = Object.keys(buttons) as TTypeModal[]
  const currentButtons=['settings', 'settingsVideo']
  const filteredButtons=selectingButtons(allButtons, currentButtons) as TTypeModal[]
  const dispatch=useDispatch()
  function actionClick(this: { type:  TTypeModal}) {
    dispatch(changeTypeModal(this.type))
    dispatch(openModal(true))
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
              <ButtonWrapper action={actionClick.bind({type: button})} >
                {buttons[button]}
              </ButtonWrapper>

              <ListItemText sx={{
                padding: '0'
              }}>
                <Typography variant='subtitle1'>
                  {t(`modal.more.${button}`)}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>;
        })}
      </List>

    </nav>
  </Box>;
});

export { More };
