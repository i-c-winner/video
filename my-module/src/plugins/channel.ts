import { LoadedIndicator } from "./LoadedIndicator";

class Channel {
  private static instance: Channel;
  private channel: RTCDataChannel | undefined;
  private receivedFileBuffer: Uint8Array [];
  public static changeIndicators: ((...args: any[]) => void | undefined) | undefined;
  private indicators: { fileName: string, indicator: LoadedIndicator }[] = [];

  constructor() {
    if (!Channel.instance) {
      Channel.instance = this;
    }
    this.receivedFileBuffer = [];
    return Channel.instance;
  }

  addHandler(changeIndicators: (...args: any[]) => void) {
    Channel.changeIndicators = changeIndicators;
  }


  init(props: { channel: RTCDataChannel }) {
    this.channel = props.channel;
    let startDownload = true;
    this.channel.onmessage = (ev) => {
      const message = new Response(ev.data).text();
      message.then((result) => {
        const chunkSize = 12000;
        const message = JSON.parse(atob(result));
        const uint8array = new Uint8Array(message.chunk);
        this.receivedFileBuffer.push(uint8array);
        console.info("received bit: ", message.chunk_number * chunkSize, "all bit: ", message.file_size);
        if (Channel.changeIndicators) {
          if (startDownload) {
            startDownload = false;
            const indicator = { fileName: message.file_name, indicator: new LoadedIndicator() };
            this.indicators.push(indicator);
            indicator.indicator.init(message.file_name, message.file_size);
          } else {
            this.indicators.forEach((indicator) => {
              if (indicator.fileName === message.file_name) {
                indicator.indicator.progress(message.chunk_number * chunkSize);
              }
            });
            console.log(message.chunk_number, message.file_size);
          }
        }
        if ((message.chunk_number+1) * chunkSize >= message.file_size) {
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
            startDownload = true;
            Channel.changeIndicators({
              fileName: message.file_id,
              status: "finish"
            });
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
