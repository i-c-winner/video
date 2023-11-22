import { IPropsButton } from '../../../types';
import { Box } from '@mui/material';
import { ButtonWithIcon } from './ButtonWithIcon';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

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
  action: () => void,
  children: ReactJSXElement | false

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
    </Box>
  );
}

export { ButtonWithSubmenu };
