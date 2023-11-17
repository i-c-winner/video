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

function CreateButtonWithIcon(props: IProps) {
  const [ wasToggled, setWasToggled ] = useState<boolean>(false);

  function action() {
    props.action(wasToggled);
    setWasToggled(!wasToggled);
  }

  function getStyles() {
    if (props.buttonIsSwitcher) {
      if (wasToggled) {
        return props.styles?.wasToggled;
      }
      return props.styles?.wasNotToggled;
    } else {
      return props.styles?.otherRules
    }
  }
console.log('STYLES', props, getStyles())
  return (
    <Button
      classes={props.classes}
      variant={props.variant}
      startIcon={<CreateSvgIcon sizes={props.sizes} styles={getStyles()} icon={props.startIcon}/>}
      onClick={action}
    >
    </Button>
  );
}

export { CreateButtonWithIcon };
