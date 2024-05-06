import { ButtonClasses } from "@mui/material";

type TKyes = keyof ButtonClasses;

interface ICandidates {
  list: RTCIceCandidate[];
  pushCandidate: (candidate: RTCIceCandidate) => void;
  getList: () => RTCIceCandidate[];
  reset: () => void;
}

interface IPropsButton {
  buttonIsSwitcher?: boolean;
  name?: string;
  sizes?: {
    width?: string;
    height?: string;
    viewBox?: string;
  };
  variant?: "text" | "contained" | "outlined";
  classes?: {
    [key: string]: string;
  };
  action: (...args: any[]) => void;
  styles?: {
    [key: string]: string;
  };
  wrapperStyles?: {
    [key: string]: string;
  };
  tooltipKey?: string;
}

interface ISharing {
  start: () => Promise<any>;
  stop: () => void;
}

interface ISubmenu {
  style?: {
    [key: string]: string;
  };
}

export type { ISharing, IPropsButton, ICandidates, ISubmenu };
