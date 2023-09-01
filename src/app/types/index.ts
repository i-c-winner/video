interface IStreams  {
  streamsId: string[]
}
interface IChat {
  chats: {
    author: string,
    time: string,
    text: string,
    id: string
  }[]
}

export type { IStreams, IChat }
