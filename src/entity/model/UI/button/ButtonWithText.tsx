import { Button, Box } from '@mui/material';
import { IPropsButton } from '../../../types';
import { getStyles } from '../../../../features/UI/buttons/getStyles';
interface IProps extends IPropsButton {
  text: string
}

function ButtonWithText(props: IProps) {

  return (
    <Box sx={getStyles(props.wrapperStyles)}>
      <Button onClick={props.action} variant={props.variant} >{props.text}</Button>
    </Box>

  );
}

export { ButtonWithText }
