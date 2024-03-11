interface IVideoQty {
  disabled: 'disabled',
  low: 'low',
  middle: 'middle',
  height: 'height'
}

interface IAudioQty {
  enabled: 'enabled',
  disabled: 'disabled'
}

interface IStyle {
  [key: string]: string;
}
interface IIcon {
  attributes: {
    [key: string]: string
  },
  content: string,
}

export type { IVideoQty, IAudioQty, IStyle, IIcon };
