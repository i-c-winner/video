import { ButtonClasses, ButtonPropsVariantOverrides } from '@mui/material';

type TKyes = keyof ButtonClasses

interface IPropsButton {
  name?: string,
  variant:  "text" | "contained" | "outlined" | undefined ,
  sizes?: {
    width?: number,
    height?: number,
    viewBox?: string
  },
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
    }
  }
}

interface ISharing {
  start: () => Promise<any>,
  stop: () => void
}

export type { ISharing, IPropsButton };
