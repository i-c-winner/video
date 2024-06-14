import { LoadedIndicator } from "./LoadedIndicator";

class Channel {
  private static instance: Channel;
  private channel: RTCDataChannel | undefined;
  private receivedFileBuffer: Uint8Array [];
  public static changeIndicators: ((...args: any[]) => void | undefined) | undefined;
  private indicators: { fileName: string, indicator: LoadedIndicator }[] = [];
  private startDownload: boolean = true;
  private chunkSize = 12000;
  private file: File | undefined;
  private currentChunk: number = 0;
  private chunks: number = 0;
  private id: number = Math.floor(Math.random() * 1000000 + 1);
  private timestamp: number = 0;
  private changeIndicators: any;
  private firstChunkforOnMessageListener = 2;

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


  init = (props: { channel: RTCDataChannel }) => {
    this.channel = props.channel;
    this.startDownload = true;
    this.channel.addEventListener('message', this.messageListener)
  };
  messageListener= (ev: MessageEvent<any>) =>{
    const message = new Response(ev.data).text();
    message.then((result) => {
      if ("file_name" in JSON.parse(atob(result))) {

        this.receive(result);
      } else {
        this.sendingFile();
      }
    });
  }
  sendingFile = () => {
    if (this.file) {
      if (this.currentChunk < this.chunks) {
        if (Channel.changeIndicators) {
          if (this.currentChunk === this.firstChunkforOnMessageListener) {
            const indicator = { fileName: this.file.name, indicator: new LoadedIndicator() };
            this.indicators.push(indicator);
            indicator.indicator.init(this.file.name, this.file.size);
          } else {
            this.indicators.forEach((indicator) => {
              if (indicator.fileName === this.file?.name) {
                indicator.indicator.progress(this.currentChunk * this.chunkSize);
              }
            });
          }
        }
        this.readFileInChunks()
      } else {
        console.info(`file: ${this.file.name} received`);
        if (Channel.changeIndicators) {
          this.indicators.forEach((indicator) => {
            if (indicator.fileName === this.file?.name) {
              indicator.indicator.finish();
            }
            this.indicators = this.indicators.filter((indicator) => {
              return indicator.fileName !== this.file?.name;
            });
          });
        }
      }
    }
  };

  receive(result: string) {
    const chunkSize = 12000;
    const message = JSON.parse(atob(result));
    const uint8array = new Uint8Array(message.chunk);
    this.receivedFileBuffer.push(uint8array);
    console.info("received bit: ", message.chunk_number * chunkSize, "all bit: ", message.file_size);
    if (Channel.changeIndicators) {
      if (this.startDownload) {
        this.startDownload = false;
        const indicator = { fileName: message.file_name, indicator: new LoadedIndicator() };
        this.indicators.push(indicator);
        indicator.indicator.init(message.file_name, message.file_size);
      } else {
        this.indicators.forEach((indicator) => {
          if (indicator.fileName === message.file_name) {
            indicator.indicator.progress(message.chunk_number * chunkSize);
          }
        });
      }
    }
    if ((message.chunk_number + 1) * chunkSize >= message.file_size) {
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
        this.startDownload = true;
        Channel.changeIndicators({
          fileName: message.file_id,
          status: "finish"
        });
      }
      this.startDownload = true;
    }
  }

  setFile(file: File) {
    this.file = file;
    this.id= Math.floor(Math.random() * 1000000 + 1);
    this.currentChunk=0
    this.chunks = Math.ceil(this.file.size / this.chunkSize);
  }

  readFileInChunks = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const chunk = reader.result as ArrayBuffer;
        const message = {
          chunk_number: this.currentChunk,
          chunk: Array.from(new Uint8Array(chunk)),
          file_id: this.id,
          file_size: this.file?.size,
          file_name: this.file?.name,
          lifetime: 60 * 60 * 24,
          timestamp: this.timestamp
        };
        const encodedMessage = btoa(JSON.stringify(message));
        this.getChannel()?.send(encodedMessage);
        this.currentChunk++;
        // if (this.getChannel()) {
        //   if (this.getChannel()!.bufferedAmount < this.getChannel()!.bufferedAmountLowThreshold) {
        //     this.readFileInChunks();
        //   }
        // }

        if (this.currentChunk === 1) {
          this.readFileInChunks();
        }
      }
    };
    reader.onerror = function(err) {
      new Error(`error with send file ${err}`);
    };
    this.loadNext(reader, this.chunkSize);
  };
  loadNext = (reader: FileReader, chunkSize: number) => {
    if (this.file) {
      const start = this.currentChunk * chunkSize;
      const blobSlice = new Blob([this.file]);
      const chunk = blobSlice.slice(start, start + chunkSize);
      reader.readAsArrayBuffer(chunk);
    }
  };

  getChannel() {
    return this.channel;
  }
}

export { Channel };
