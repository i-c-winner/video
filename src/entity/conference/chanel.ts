class Chanel {
  private _currentChunkStop: number;
  private _currentChunkStart: number;
  private _instance: RTCDataChannel | null;
  private _fileDescription: { file_name: string; file_size: number; timestamp: string };
  private _file: any;
  private static chunkSize: number=16384;
  private _fileReader: FileReader;


  constructor() {
    this._fileReader = new FileReader();
    this._instance = null;
    this._fileDescription = {
      file_name: '',
      file_size: 0,
      timestamp: ''
    };
    this._currentChunkStart = 0;
    this._currentChunkStop = Chanel.chunkSize;
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
      console.log(this._currentChunkStart, this._currentChunkStop)
      if (this._currentChunkStop < this._file.size) {
        this._currentChunkStart = this._currentChunkStop;
        this._currentChunkStop = this._currentChunkStop + Chanel.chunkSize;
        this.readBuffer()
        console.log('load')
      } else {
        this._currentChunkStart=0
        this._currentChunkStop=Chanel.chunkSize
      }
    };
    this._fileReader.onloadend= ()=>{
      console.log('END')
    }
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

}

const chanel = new Chanel();
export { chanel };
