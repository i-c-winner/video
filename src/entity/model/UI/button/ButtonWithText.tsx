import { Button } from '@mui/material';
import { IPropsButton } from '../../../types';
interface IProps extends IPropsButton {
  text: string
}

function ButtonWithText(props: IProps) {

  return (
<Button variant={props.variant} >{props.text}</Button>
  );
}

export { ButtonWithText }
