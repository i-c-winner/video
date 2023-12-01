import { Button, Box } from '@mui/material';
import { IPropsButton } from '../../../types';
import { getStyles } from '../../../../features/UI/buttons/getStyles';
import { CreateSvgIcon } from '../../../../features/CreaeteSvgIcon';
interface  IProps extends IPropsButton {
  text: string,
 startIcon?: {
   attributes: {
     [key: string]: string
   },
   content: string,
 } ,
  endIcon?: {
    attributes: {
      [key: string]: string
    },
    content: string,
  }
}

function ButtonWithText(props: IProps) {

  return (
    <Box sx={getStyles(props.wrapperStyles)}>
      <Button
        classes={props.classes}
        style={props.styles}
        startIcon={<CreateSvgIcon sizes={props.sizes} icon={props.startIcon} />}
        onClick={props.action} variant={props.variant} >{props.text}</Button>
    </Box>

  );
}

export { ButtonWithText }
