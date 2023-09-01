interface IStreams  {
  streamsId: string[]
}
interface IChat {
  author: string,
  time: string,
  text: string,
  id: string
}
type  TChats = IChat[]


export type { IStreams, IChat, TChats }
