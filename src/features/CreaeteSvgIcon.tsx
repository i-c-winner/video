import { useRef, useEffect } from "react";
import {constants} from '../shared/config';

interface Props {
  icon?:{
    attributes: {
      [key: string]: string
    },
    content: string,
  }

  sizes?: {
    width?: string,
    height?: string,
    viewBox?: string
  }
  styles?: {
    [key: string]: string | (()=>string)
  },
}


function CreateSvgIcon(props: Props) {
  const { width, height, viewBox } = constants.icon.buttonIcon;
  const refIcon = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (refIcon.current!==null&&props.icon) refIcon.current.insertAdjacentHTML("afterbegin", props.icon.content);
  }, []);
  return (
    <svg style={props.styles} fill="currentColor" ref={refIcon} id={props.icon?.attributes.id} version={props.icon?.attributes.version}
  xmlns={props.icon?.attributes.xmlns}
  viewBox={props.sizes?.viewBox? props.sizes.viewBox: viewBox}
  width={props.sizes?.width ? props.sizes?.width : width}
  height={props.sizes?.height ? props.sizes?.height : height}
    ></svg>
);
}

export { CreateSvgIcon };

