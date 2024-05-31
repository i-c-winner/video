class Channel {
  private static instance: Channel;
  private channel: RTCDataChannel | undefined;
  private receivedSizes: number;
  private receivedFileBuffer: Uint8Array [];
  public static changeIndicators: ((...args: any[]) => void | undefined) | undefined;

  constructor() {
    if (!Channel.instance) {
      Channel.instance = this;
    }
    this.receivedSizes = 0;
    this.receivedFileBuffer = [];
    return Channel.instance;
  }

  addHandler(changeIndicators: (...args: any[]) => void) {
    Channel.changeIndicators=changeIndicators
  }


  init(props: { channel: RTCDataChannel }) {
    this.channel = props.channel;
    let startDownload=true
    this.channel.onmessage = (ev) => {
      const message = new Response(ev.data).text();
      message.then((result) => {

        const message = JSON.parse(atob(result));
        this.receivedSizes += message.chunk.length;
        const uint8array = new Uint8Array(message.chunk);
        this.receivedFileBuffer.push(uint8array);
        console.info("received bit: ", this.receivedSizes, "all bit: ", message.file_size);
        if (Channel.changeIndicators) {
          if (startDownload) {
            startDownload = false;
            Channel.changeIndicators({
              fileName: message.file_name,
              status: "start"
            })
          }

        }
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
          if (Channel.changeIndicators) {
            startDownload=true
            Channel.changeIndicators({
              fileName: message.file_name,
              status: "finish"
            })
          }
        }
      });
    };
  }

  getChnannel() {
    return this.channel;
  }
}

export { Channel };
