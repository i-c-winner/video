import { IPropsButton } from '../../../types';
import { Box, Button } from '@mui/material';
import { ButtonWithIcon } from './ButtonWithIcon';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {iconArrow} from '../../../../shared/img/svg';


interface IProps extends IPropsButton {
  startIcon: {
    attributes: {
      [key: string]: string
    },
    content: string,
  },
  endIcon?: {
    attributes: {
      [key: string]: string
    },
    content: string,
  },
  children: ReactJSXElement | false,
  openSubmenu: ()=>void

}

function ButtonWithSubmenu(props: IProps) {
  return (
    <Box sx={{
      position: 'relative'
    }}>
      {props.children && <Box sx={{
        position: 'absolute',
        bottom: '50px',
        left: '25px'
      }}>
        {props.children}
      </Box>}
      <ButtonWithIcon {...props}/>
      <ButtonWithIcon
        styles={{
          position: 'absolute',
          bottom: '32px',
          left: '43px'
        }} startIcon={iconArrow} action={props.openSubmenu}/>
    </Box>
  );
}

export { ButtonWithSubmenu };
