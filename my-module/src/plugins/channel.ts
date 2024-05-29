class Channel {
  private static instance: Channel;
  private channel: RTCDataChannel | undefined;
  private receivedSizes: number;
  private receivedFileBuffer: Uint8Array [];

  constructor() {
    if (!Channel.instance) {
      Channel.instance = this;
    }
    this.receivedSizes = 0;
    this.receivedFileBuffer = [];
    return Channel.instance;
  }

  init(props: { channel: RTCDataChannel }) {
    this.channel = props.channel;
    this.channel.onmessage = (ev) => {
      const message = new Response(ev.data).text();
      message.then((result) => {
        const message = JSON.parse(atob(result));
        this.receivedSizes += message.chunk.length;
        const uint8array = new Uint8Array(message.chunk);
        this.receivedFileBuffer.push(uint8array);
        console.info("received bit: ", this.receivedSizes, "all bit: ", message.file_size);
        if (this.receivedSizes >= message.file_size) {
          const receivedBlob = new Blob(this.receivedFileBuffer);
          const url = URL.createObjectURL(receivedBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = message.file_name; // use the filename from the message
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.receivedFileBuffer = [];
        }
      });
    };
  }

  getChnannel() {
    return this.channel;
  }
}

export { Channel };
