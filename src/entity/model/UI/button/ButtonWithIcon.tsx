import { IPropsButton } from '../../../types';
import { Button } from '@mui/material';
import { CreateSvgIcon } from '../../../../features/CreaeteSvgIcon';
import { useState } from 'react';

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
}

function ButtonWithIcon(props: IProps) {
  const [ active, setActive ] = useState<boolean>(false);

  function action() {
    props.action(active);
    setActive(!active);
  }

  return (
    <Button
      classes={props.classes}
      variant={props.variant}
      startIcon={<CreateSvgIcon styles={props.styles} sizes={props.sizes}  icon={props.startIcon}/>}
      onClick={action}
    >
    </Button>
  );
}

export { ButtonWithIcon };
