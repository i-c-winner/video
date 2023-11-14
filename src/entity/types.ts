interface ISharing {
  start: ()=>Promise<any>,
  stop: ()=>void
}

export type {ISharing}
