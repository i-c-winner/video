import { Channel } from "../plugins/channel";

const channel = new Channel();

interface IProps {
  file: File;
}

class SentFile {
  private file: File;
  private channel: RTCDataChannel;
  private currentChunk: number;
  private chunks: number;
  private id: number;
  private timestamp: number;

  constructor(props: IProps) {
    this.channel = channel.getChnannel() as RTCDataChannel;
    this.file = props.file;
    this.currentChunk = 0;
    const chunkSize = 12000;
    this.chunks = Math.ceil(this.file.size / chunkSize);
    this.id = Math.floor(Math.random() * 1000000 + 1);
    this.timestamp = Date.now();
    this.channel.onmessage = (ev) => {
      const message = new Response(ev.data).text();
      message.then((result) => {
        const message = JSON.parse(atob(result));
        if (message.file_name) {
        } else {
          if (this.currentChunk <= this.chunks) {
            this.readFileInChunks();
          } else {
            console.info(`file: ${this.file.name} received`);
          }
        }
      });
    };
  }

  readFileInChunks = () => {
    const chunkSize = 12000;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const chunk = reader.result as ArrayBuffer;
        const message = {
          chunk_number: this.currentChunk,
          chunk: Array.from(new Uint8Array(chunk)),
          file_id: this.id,
          file_size: this.file.size,
          file_name: this.file.name,
          lifetime: 60 * 60 * 24,
          timestamp: this.timestamp
        };
        const encodedMessage = btoa(JSON.stringify(message));
        this.channel.send(encodedMessage);
        this.currentChunk++;
        if (this.channel.bufferedAmount < this.channel.bufferedAmountLowThreshold) {
          this.readFileInChunks();
        }
        if (this.currentChunk === 1) {
          this.readFileInChunks();
        }
      }
    };
    reader.onerror = function(err) {
      new Error(`error with send file ${err}`);
    };
    this.loadNext(reader, chunkSize);
  };
  loadNext = (reader: FileReader, chunkSize: number) => {
    const start = this.currentChunk * chunkSize;
    const blobSlice = new Blob([this.file]);
    const chunk = blobSlice.slice(start, start + chunkSize);
    reader.readAsArrayBuffer(chunk);
  };
}

export { SentFile };