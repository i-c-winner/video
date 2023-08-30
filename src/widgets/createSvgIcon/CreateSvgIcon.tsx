import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

interface Props {
  attributes: {
    [key: string]: string
  },
  content: string,
  sizes?: {
    width: string,
    height: string
  }
  styles?: {
    [key: string]: string
  }
}


function CreateSvgIcon(props: Props) {
  const config = useSelector((state: any) => state.config);
  const { width, height } = config.icon.buttonIcon;
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
         viewBox={props.attributes.viewBox}
         xmlns={props.attributes.xmlns}
         width={props.sizes?.width ? props.sizes.width : width}
         height={props.sizes?.height ? props.sizes.height : height}
    ></svg>
  );
}

export { CreateSvgIcon };
