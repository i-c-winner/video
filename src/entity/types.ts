import { ButtonClasses } from '@mui/material';

type TKyes = keyof ButtonClasses

interface IPropsButton {
  buttonIsSwitcher?: boolean,
  name?: string,
  sizes?: {
    width?: string,
    height?: string,
    viewBox?: string
  },
  variant?: "text" | "contained" | "outlined"
  classes?: {
    [key: string]: string
  }
  action: (...args: any[]) => void,
  styles?: {
    wasToggled?: {
      [key: string]: string
    },
    wasNotToggled?: {
      [key: string]: string
    },
    otherRules?: {
      [key: string]: string
    }
  }
}

interface ISharing {
  start: () => Promise<any>,
  stop: () => void
}

export type { ISharing, IPropsButton };
