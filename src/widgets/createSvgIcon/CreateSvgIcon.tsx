import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {constants} from '../../shared/config/constants';

interface Props {
  attributes: {
    [key: string]: string
  },
  content: string,
  sizes?: {
    width: string,
    height: string,
    viewBox: string
  }
  styles?: {
    [key: string]: string | (()=>string)
  }
}


function CreateSvgIcon(props: Props) {
  const config = useSelector((state: any) => state.config);
  const { width, height, viewBox } = constants.icon.buttonIcon;
  const refIcon = useRef<any>(null);


  function getHeight() {

  }

  function getWidth() {
  }

  useEffect(() => {
    // if (refIcon.current !== null) {
    refIcon.current.insertAdjacentHTML("afterbegin", props.content);
    // }
  }, []);
  return (
    <svg style={props.styles} fill="currentColor" ref={refIcon} id={props.attributes.id} version={props.attributes.version}
         xmlns={props.attributes.xmlns}
         viewBox={props.sizes?.viewBox? props.sizes.viewBox: viewBox}
         width={props.sizes?.width ? props.sizes?.width : width}
         height={props.sizes?.height ? props.sizes?.height : height}
    ></svg>
  );
}

export { CreateSvgIcon };
