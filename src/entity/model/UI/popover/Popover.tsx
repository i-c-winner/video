import { useEffect, useRef } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box } from "@mui/material";

interface IProps {
  state: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: ReactJSXElement;
}

function Popover(props: IProps) {
  const refBox = useRef<HTMLDivElement>(null);
  function click(ev: any) {}
  function stopPropagation(ev: any) {
    ev.stopPropagation();
  }
  useEffect(() => {
    function closePopover(ev: any) {
      props.onClose();
    }

    function closePopoverWithKey(ev: any) {
      if (ev.code === "Escape") props.onClose();
    }
    document.addEventListener("keydown", closePopoverWithKey);
    document.addEventListener("click", closePopover);
    return () => {
      document.removeEventListener("click", closePopover);
      document.removeEventListener("keydown", closePopoverWithKey);
    };
  });

  {
    return (
      props.state && (
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            zIndex: "10",
          }}
          onClick={stopPropagation}
        >
          {props.children}
        </Box>
      )
    );
  }
}

export { Popover };
