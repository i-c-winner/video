class Channel {
  private _currentChunkStop: number;
  private _currentChunkStart: number;
  private _instance: RTCDataChannel | null;
  private _fileDescription: { file_name: string; file_size: number; timestamp: string };
  private _file: any;
  private static chunkSize: number = 16384;
  private _fileReader: FileReader;
  private _chunks: BlobPart[];
  private _currentSizeChunks: number;
  private _startComplitChunks: boolean;


  constructor() {
    this._fileReader = new FileReader();
    this._currentSizeChunks = 0;
    this._instance = null;
    this._startComplitChunks = false;
    this._fileDescription = {
      file_name: '',
      file_size: 0,
      timestamp: ''
    };
    this._chunks = [];
    this._currentChunkStart = 0;
    this._currentChunkStop = Channel.chunkSize;
    this._listeners();
  }

  init(chanel: RTCDataChannel) {
    this._instance = chanel;
  }

  _listeners = () => {
    this._fileReader.onload = () => {
      if (this._instance) {
        this.send(this._fileReader.result);
      }
      if (this._currentChunkStop < this._file.size) {
        this._currentChunkStart = this._currentChunkStop;
        this._currentChunkStop = this._currentChunkStop + Channel.chunkSize;
        this.readBuffer();
      } else {
        this._currentChunkStart = 0;
        this._currentChunkStop = Channel.chunkSize;
      }
    };
    this._fileReader.onloadend = () => {
      console.log('END');
    };
  };

  getInstance() {
    return this._instance;
  }

  send(data: any) {
    if (this._instance) this._instance.send(data);
  }

  createFileDescriotion(description: {
    file_name: string,
    file_size: number,
    timestamp: string
  }) {
    this._fileDescription = description;
  }

  setCurrentFile(file: File) {
    this._file = file;
    this.readBuffer();
  }

  readBuffer() {
    this._fileReader.readAsArrayBuffer(this._file.slice(this._currentChunkStart,
      this._currentChunkStop));
  }

  putChunks(message: MessageEvent) {
    this._chunks.push(message.data);
    if (this._chunks.length > 1 && message.data.byteLength < Channel.chunkSize) {
        const blob = new Blob(this._chunks.slice(1), { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this._fileDescription.file_name;
        link.click();
        this._chunks = [];
    }
  }

  saveFile() {

  }
}

const channel = new Channel();
export { channel };
