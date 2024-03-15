import { IPropsButton } from '../../../types';
import { Box, Button, Tooltip } from '@mui/material';
import { CreateSvgIcon } from '../../../../features/CreaeteSvgIcon';
import { useEffect, useState } from 'react';
import { getStyles } from '../../../../features/UI/buttons/getStyles';

interface IProps extends IPropsButton{
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
}

function ButtonWithIcon(props: IProps) {
  const [ active, setActive ] = useState<boolean>(false);

  function action() {
    props.action(active);
    setActive(!active);
  }

  return (
    <Box
      sx={getStyles(props.wrapperStyles)}>
      <Button
        classes={props.classes}
        variant={props.variant}
        startIcon={
          <CreateSvgIcon styles={props.styles} sizes={props.sizes}  icon={props.startIcon} {...props}/>
       }
        onClick={action}
      >
      </Button>
    </Box>

  );
}

export { ButtonWithIcon };
