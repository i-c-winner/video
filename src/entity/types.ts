interface IPropsButton {
  name?: string,
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
