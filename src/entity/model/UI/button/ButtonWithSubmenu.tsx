import { IPropsButton } from '../../../types';
import { Box, Button } from '@mui/material';
import { ButtonWithIcon } from './ButtonWithIcon';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { iconArrow } from '../../../../shared/img/svg';
import { CreateSvgIcon } from '../../../../features/CreaeteSvgIcon';
import { useEffect, useState } from 'react';


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
  openSubmenu: () => void,
}


function ButtonWithSubmenu(props: IProps) {
  const [ openChildren, setOpenChildren ] = useState<boolean>(false);
  useEffect(() => {
    document.addEventListener('keydown', () => {
      console.log('document');
    });
  });
function openingChildren() {
  setOpenChildren(!openChildren)
}
useEffect(()=>{
  function closingChildren (button: KeyboardEvent) {
    if (button.key==='Escape') {
      setOpenChildren(false)
    }
  }
  document.addEventListener('keydown', closingChildren)
  return ()=>{
    document.removeEventListener('keydown', closingChildren)
  }
}, [])
  return (
 <Box sx={{
      position: 'relative'
    }}>
      <Box sx={{
        position: 'absolute',
        bottom: '50px',
        left: '25px'
      }}>
        {openChildren && props.children}
      </Box>
      <ButtonWithIcon {...props}/>
      <Button
        onClick={openingChildren}
        sx={{
          position: 'absolute',
          left: '37px',
          top: '0'
        }}>
        <CreateSvgIcon sizes={{
          width: '15px',
          height: '10px',
          viewBox: '3 0 10 10'
        }} icon={iconArrow}/>
      </Button>
    </Box>
  );
}

export { ButtonWithSubmenu };
