class Chanel {
  private _instance: RTCDataChannel|null;
  private _fileDescription: { file_name: string; file_size: number; timestamp: string };

  constructor() {
    this._instance=null
    this._fileDescription = {
      file_name: '',
      file_size: 0,
      timestamp: ''
    };
  }

  init(chanel: RTCDataChannel) {
    this._instance = chanel;
  }

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
}

const chanel = new Chanel();
export { chanel };
