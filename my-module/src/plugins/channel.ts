class Channel {
  private _offset: number;
  private _instance: RTCDataChannel | null;

  private _file: any;
  private static chunkSize: number = 16384;
  private _chunks: BlobPart[];
  private _currentSizeChunks: number;
  private _startComplitChunks: boolean;
  private _fileReader: FileReader;
  private TIMEOUTSIZE: number;
  private BUFFERSIZE: number;

  constructor() {
    this.TIMEOUTSIZE = 25;
    this.BUFFERSIZE = 1000000;
    this._fileReader = new FileReader();
    this._currentSizeChunks = 0;
    this._instance = null;
    this._startComplitChunks = false;
    this._chunks = [];
    this._offset = 0;
    this._fileReader.onload = () => {
      setTimeout(() => {
        this.sendData(this._fileReader.result);
        this.sliceFile();
      }, this.TIMEOUTSIZE);
    };
  }

  sliceFile() {
    if (this._offset < this._file.size) {
      this.readBuffer();
    } else {
      this._offset = 0;
    }
  }

  init(chanel: RTCDataChannel) {
    this._instance = chanel;
  }

  sendData(data: any) {
    if (this._instance) this._instance.send(data);
  }

  sendBodyFile(file: File) {
    this._file = file;
    this.readBuffer();
  }

  readBuffer() {
    this._fileReader.readAsArrayBuffer(
      this._file.slice(this._offset, (this._offset += Channel.chunkSize)),
    );
  }

  putChunks(message: MessageEvent) {
    this._chunks.push(message.data);
    const itIsParams = () => {
      return this._chunks.length > 1;
    };
    if (
      itIsParams() &&
      (message.data.size ?? message.data.byteLength) < Channel.chunkSize
    ) {
      try {
        const blob = new Blob(this._chunks.slice(1), {
          type: "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "fileDownload";
        link.click();
        this._chunks = [];
      } catch (e) {
        console.error(e);
      }
    }
  }
}

export { Channel };
