interface IStreams  {
  streamsId: string[]
}
interface IChat {
  chats: {
    author: string,
    time: Date,
    text: string
  }[]
}

export type { IStreams, IChat }
