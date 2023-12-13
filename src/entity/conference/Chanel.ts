class Chanel {
  private _instance: RTCDataChannel;

  constructor(chanel: RTCDataChannel) {
    this._instance = chanel;

  }

  init(chanel: RTCDataChannel) {
    this._instance = chanel;
  }

  getInstance() {
    return this._instance;
  }

  send(data: any) {
    this._instance.send(data);
  }
}
export { Chanel };
