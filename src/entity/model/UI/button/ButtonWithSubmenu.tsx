import { IPropsButton } from '../../../types';
import { Box, Button } from '@mui/material';
import { ButtonWithIcon } from './ButtonWithIcon';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { iconArrow } from '../../../../shared/img/svg';
import { CreateSvgIcon } from '../../../../features/CreaeteSvgIcon';
import { useState } from 'react';
import { Popover } from '../popover/Popover';


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
  children: ReactJSXElement,
  openSubmenu: () => void,

}


function ButtonWithSubmenu(props: IProps) {
  const [ popoverVisible, setPopoverVisible ] = useState<boolean>(false);

  function closeVisiblePopover() {
    setPopoverVisible(false);
  }

  function openVisiblePopover() {
    setPopoverVisible(true);
  }

  function toggledVisiblePopover(ev: any) {
    ev.stopPropagation()
    setPopoverVisible(!popoverVisible);
  }

  return (
    <Box sx={{
      position: 'relative'
    }}>
      <Box sx={{
        position: 'absolute',
        bottom: '50px',
        left: '25px'
      }}>

      </Box>
      <ButtonWithIcon {...props}/>
      <Button
        onClick={toggledVisiblePopover}
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
        <Popover
          onOpen={openVisiblePopover}
          onClose={closeVisiblePopover}
          state={popoverVisible}>
          {props.children}
        </Popover>
      </Button>
    </Box>
  );
}

export { ButtonWithSubmenu };
