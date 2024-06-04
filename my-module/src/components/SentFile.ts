import { Channel } from "../plugins/channel";
import { LoadedIndicator } from "../plugins/LoadedIndicator";

const channel = new Channel();

interface IProps {
  file: File;
}

/**
 * becose first metod channel.send have`not
 * event onmessage
 */
const firstChunkforOnMessageListener = 2;

class SentFile {
  private file: File;
  private channel: RTCDataChannel;
  private currentChunk: number;
  private chunks: number;
  private id: number;
  private timestamp: number;
  private changeIndicators: any;
  private indicators: { fileName: string, indicator: LoadedIndicator }[];

  constructor(props: IProps) {
    this.channel = channel.getChnannel() as RTCDataChannel;
    this.file = props.file;
    this.indicators = [];
    this.currentChunk = 0;
    const chunkSize = 12000;
    this.chunks = Math.ceil(this.file.size / chunkSize);
    this.id = Math.floor(Math.random() * 1000000 + 1);
    this.timestamp = Date.now();
    this.channel.onmessage = () => {
      if (this.currentChunk <= this.chunks) {
        if (Channel.changeIndicators) {
          if (this.currentChunk === firstChunkforOnMessageListener) {
            const indicator = { fileName: this.file.name, indicator: new LoadedIndicator() };
            this.indicators.push(indicator);
            indicator.indicator.init(this.file.name, this.file.size);
          } else {
            this.indicators.forEach((indicator) => {
              if (indicator.fileName === this.file.name) {
                indicator.indicator.progress(this.currentChunk * chunkSize);
              }
            });
          }
        }
        this.readFileInChunks();
      } else {
        console.info(`file: ${this.file.name} received`);
        if (Channel.changeIndicators) {
          this.indicators.forEach((indicator) => {
            if (indicator.fileName === this.file.name) {
              indicator.indicator.finish();
            }
            this.indicators = this.indicators.filter((indicator) => {
              return indicator.fileName !== this.file.name;
            });
          });
        }
      }

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
          timestamp: this.timestamp,
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