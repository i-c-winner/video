import { IStyle } from '../../../widgets/type';

function getStyles(styles: IStyle|undefined) {
  if (styles) {
    return styles
  } return undefined
}

export {getStyles}
