import { IPropsButton } from '../../../types';
import { Box, Button } from '@mui/material';
import { ButtonWithIcon } from './ButtonWithIcon';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {iconArrow} from '../../../../shared/img/svg';
import { CreateSvgIcon } from '../../../../features/CreaeteSvgIcon';


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
      <Button
        sx={{
          position: 'absolute',
          left: '37px',
          top: '0'
        }}
        onClick={props.openSubmenu}>
        <CreateSvgIcon icon={iconArrow} />
      </Button>
    </Box>
  );
}

export { ButtonWithSubmenu };
