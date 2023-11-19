
interface IVideiQty {
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
  [key: string]: string
}

export type {IVideiQty, IAudioQty, IStyle}
