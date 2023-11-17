import { IPropsButton } from '../../../types';
import { Button, createSvgIcon } from '@mui/material';
import { CreateSvgIcon } from '../../../../features/CreaeteSvgIcon';
import { useState } from 'react';
import { config } from '../../../../shared/config';

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

function CreateButtonWithIcon(props: IProps) {
  const [ wasToggled, setWasToggled ] = useState<boolean>(false);

  function action() {
  props.action(wasToggled)
    setWasToggled(!wasToggled);
  }
  function getStyles() {
    if (wasToggled) {
      return props.styles?.wasToggled
    } return props.styles?.wasNotToggled
  }

  return (
    <Button
      startIcon={<CreateSvgIcon styles={getStyles()} icon={props.startIcon}/>}
      onClick={action}
    >
    </Button>
  );
}

export { CreateButtonWithIcon };
