class Channel {
  private _instance: RTCDataChannel | null;
  constructor() {
    this._instance = null;
  }

  init(chanel: RTCDataChannel) {
    this._instance = chanel;
  }
  sendFile(file: File) {
console.log(file)
  }

}

export { Channel };
