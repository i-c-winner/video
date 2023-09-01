interface IStreams  {
  streamsId: string[]
}
interface IChat {
  author: string,
  time: string,
  text: string,
  id: string
}
interface IChats {
  chats: IChat[]

}

export type { IStreams, IChat, IChats }
