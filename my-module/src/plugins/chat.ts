type TSendMessage = (message: Strophe.Builder) => void;

class Chat {
  sendMessage(
    action: TSendMessage,
    text: string,
    params: {
      userNode: string;
      roomName: string;
      displayName: string;
    },
  ) {
    const message = new Strophe.Builder("message", {
      from: `${params.userNode}@prosolen.net/${params.userNode}`,
      id: params.userNode,
      to: `${params.roomName}@conference.prosolen.net`,
      type: "groupchat",
    })
      .c("body")
      .t(text)
      .up()
      .c("jingle", {
        id: params.userNode,
        author: params.displayName,
      });
    action(message);
  }
}
const chat = new Chat();
export { chat };
