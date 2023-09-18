import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {constants} from '../../shared/config/constants';
import { IRootState } from '../../app/types';

interface Props {
  icon:{
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
  }
}


function CreateSvgIcon(props: Props) {
  const config = useSelector((state: IRootState) => state.config);
  const { width, height, viewBox } = constants.icon.buttonIcon;
  const refIcon = useRef<any>(null);
  function getHeight() {

  }

  function getWidth() {
  }

  useEffect(() => {
    refIcon.current.insertAdjacentHTML("afterbegin", props.icon.content);
  }, []);
  return (
    <svg style={props.styles} fill="currentColor" ref={refIcon} id={props.icon.attributes.id} version={props.icon.attributes.version}
         xmlns={props.icon.attributes.xmlns}
         viewBox={props.sizes?.viewBox? props.sizes.viewBox: viewBox}
         width={props.sizes?.width ? props.sizes?.width : width}
         height={props.sizes?.height ? props.sizes?.height : height}
    ></svg>
  );
}

export { CreateSvgIcon };
